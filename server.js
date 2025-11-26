const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname)));

// Store rooms and their connections
const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle room joining
  socket.on('join-room', (roomCode) => {
    console.log(`${socket.id} joining room: ${roomCode}`);

    // Leave any previous rooms
    Array.from(socket.rooms).forEach(room => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    // Join the new room
    socket.join(roomCode);

    // Initialize room if it doesn't exist
    if (!rooms.has(roomCode)) {
      rooms.set(roomCode, {
        players: new Set(),
        host: null
      });
    }

    const room = rooms.get(roomCode);
    room.players.add(socket.id);

    // Assign host if this is the first player
    if (room.host === null) {
      room.host = socket.id;
      socket.emit('role-assigned', { role: 'host', roomCode });
      console.log(`${socket.id} is now host of ${roomCode}`);
    } else {
      socket.emit('role-assigned', { role: 'client', roomCode });
      console.log(`${socket.id} joined as client in ${roomCode}`);
    }

    // Notify room of player count
    io.to(roomCode).emit('room-update', {
      playerCount: room.players.size,
      players: Array.from(room.players)
    });
  });

  // Handle game data (host sending to clients)
  socket.on('game-data', (data) => {
    const roomCode = data.roomCode;
    if (roomCode) {
      // Broadcast to all clients in the room except sender
      socket.to(roomCode).emit('game-data', data.payload);
    }
  });

  // Handle client data (client sending to host)
  socket.on('client-data', (data) => {
    const roomCode = data.roomCode;
    if (roomCode) {
      const room = rooms.get(roomCode);
      if (room && room.host) {
        // Send to host
        io.to(room.host).emit('client-data', {
          playerId: socket.id,
          payload: data.payload
        });
      }
    }
  });

  // Handle score updates
  socket.on('score-update', (data) => {
    const roomCode = data.roomCode;
    if (roomCode) {
      // Broadcast score to all in room
      io.to(roomCode).emit('score-update', data.payload);
    }
  });

  // Handle generic data sending (for compatibility with p5.livemedia pattern)
  socket.on('send-data', (data) => {
    const roomCode = data.roomCode;
    if (roomCode) {
      socket.to(roomCode).emit('receive-data', {
        senderId: socket.id,
        payload: data.payload
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove from all rooms
    rooms.forEach((room, roomCode) => {
      if (room.players.has(socket.id)) {
        room.players.delete(socket.id);

        // If host left, assign new host
        if (room.host === socket.id && room.players.size > 0) {
          room.host = Array.from(room.players)[0];
          io.to(room.host).emit('role-assigned', { role: 'host', roomCode });
          console.log(`New host assigned in ${roomCode}: ${room.host}`);
        }

        // Clean up empty rooms
        if (room.players.size === 0) {
          rooms.delete(roomCode);
          console.log(`Room ${roomCode} deleted (empty)`);
        } else {
          // Notify remaining players
          io.to(roomCode).emit('room-update', {
            playerCount: room.players.size,
            players: Array.from(room.players)
          });
        }
      }
    });

    // Notify disconnection
    socket.broadcast.emit('player-disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`🎮 Cube Hell Server running on port ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  http.close(() => {
    console.log('HTTP server closed');
  });
});
