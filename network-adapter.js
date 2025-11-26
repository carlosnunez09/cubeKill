/**
 * Cloud Network Adapter for Cube Hell
 *
 * This adapter provides a p5.livemedia-compatible API while using Socket.io
 * for cloud-based multiplayer instead of peer-to-peer WebRTC.
 *
 * This allows the existing game code to work without major changes.
 */

class CloudNetworkAdapter {
  constructor(p5Instance, type, stream, roomCode) {
    this.p5 = p5Instance;
    this.type = type; // "DATA" for this game
    this.roomCode = roomCode;
    this.callbacks = {
      data: [],
      disconnect: [],
      connect: []
    };

    // Connect to Socket.io server
    // Use environment variable or default to current host
    const serverUrl = window.CUBE_HELL_SERVER || window.location.origin;
    this.socket = io(serverUrl);

    // Set up socket event handlers
    this.setupSocketHandlers();

    // Join the room
    this.socket.emit('join-room', this.roomCode);
  }

  setupSocketHandlers() {
    // Connection established
    this.socket.on('connect', () => {
      console.log(`Connected to server with ID: ${this.socket.id}`);
      this.triggerCallbacks('connect', this.socket.id);
    });

    // Role assignment (host or client)
    this.socket.on('role-assigned', (data) => {
      console.log(`Assigned role: ${data.role} in room: ${data.roomCode}`);
      this.role = data.role;
    });

    // Receive game data
    this.socket.on('game-data', (data) => {
      this.triggerCallbacks('data', data, this.socket.id);
    });

    // Receive client data
    this.socket.on('client-data', (data) => {
      this.triggerCallbacks('data', data.payload, data.playerId);
    });

    // Receive score updates
    this.socket.on('score-update', (data) => {
      this.triggerCallbacks('data', data, this.socket.id);
    });

    // Receive generic data
    this.socket.on('receive-data', (data) => {
      this.triggerCallbacks('data', data.payload, data.senderId);
    });

    // Disconnection
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.triggerCallbacks('disconnect', this.socket.id);
    });

    // Player disconnected
    this.socket.on('player-disconnected', (playerId) => {
      console.log(`Player ${playerId} disconnected`);
      this.triggerCallbacks('disconnect', playerId);
    });

    // Room updates
    this.socket.on('room-update', (data) => {
      console.log(`Room update: ${data.playerCount} players`);
    });
  }

  /**
   * Send data to other players in the room
   * Compatible with p5.livemedia send() method
   */
  send(data) {
    if (!this.socket || !this.socket.connected) {
      console.warn('Socket not connected, cannot send data');
      return;
    }

    // Use different events based on context
    // This maintains compatibility with the existing game logic
    this.socket.emit('send-data', {
      roomCode: this.roomCode,
      payload: data
    });
  }

  /**
   * Register callback for events
   * Compatible with p5.livemedia on() method
   */
  on(eventType, callback) {
    if (this.callbacks[eventType]) {
      this.callbacks[eventType].push(callback);
    } else {
      console.warn(`Unknown event type: ${eventType}`);
    }
  }

  /**
   * Trigger callbacks for a specific event
   */
  triggerCallbacks(eventType, ...args) {
    if (this.callbacks[eventType]) {
      this.callbacks[eventType].forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in ${eventType} callback:`, error);
        }
      });
    }
  }

  /**
   * Disconnect from the server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /**
   * Check if connected
   */
  isConnected() {
    return this.socket && this.socket.connected;
  }
}

/**
 * Factory function to maintain p5.livemedia compatibility
 * Usage: new p5LiveMedia(this, "DATA", null, roomCode)
 */
class p5LiveMedia extends CloudNetworkAdapter {
  constructor(p5Instance, type, stream, roomCode) {
    super(p5Instance, type, stream, roomCode);
    console.log(`p5LiveMedia compatibility layer initialized for room: ${roomCode}`);
  }
}

// Make it available globally for the sketch
window.p5LiveMedia = p5LiveMedia;
window.CloudNetworkAdapter = CloudNetworkAdapter;
