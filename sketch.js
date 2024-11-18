/*
      --------------------------------------------------------------------
  
 ███╗   ███╗ █████╗ ██████╗ ███████╗    ██████╗ ██╗   ██╗                                          
████╗ ████║██╔══██╗██╔══██╗██╔════╝    ██╔══██╗╚██╗ ██╔╝                                          
██╔████╔██║███████║██║  ██║█████╗      ██████╔╝ ╚████╔╝                                           
██║╚██╔╝██║██╔══██║██║  ██║██╔══╝      ██╔══██╗  ╚██╔╝                                            
██║ ╚═╝ ██║██║  ██║██████╔╝███████╗    ██████╔╝   ██║                                             
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚═════╝    ╚═╝                                             
                                                                                                  
 ██████╗ █████╗ ██████╗ ██╗      ██████╗ ███████╗    ███╗   ██╗██╗   ██╗███╗   ██╗███████╗███████╗
██╔════╝██╔══██╗██╔══██╗██║     ██╔═══██╗██╔════╝    ████╗  ██║██║   ██║████╗  ██║██╔════╝╚══███╔╝
██║     ███████║██████╔╝██║     ██║   ██║███████╗    ██╔██╗ ██║██║   ██║██╔██╗ ██║█████╗    ███╔╝ 
██║     ██╔══██║██╔══██╗██║     ██║   ██║╚════██║    ██║╚██╗██║██║   ██║██║╚██╗██║██╔══╝   ███╔╝  
╚██████╗██║  ██║██║  ██║███████╗╚██████╔╝███████║    ██║ ╚████║╚██████╔╝██║ ╚████║███████╗███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝

 
                                                                                                                                                 
    ---------------------------------------------------------------------
    
    
    */

    let gameManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameManager = new GameManager();
  gameManager.setupGame();
}

function draw() {
  clear();
  gameManager.update();
}

// Classes

class GameManager {
  constructor() {
    this.menuIndex = 0;
    this.player = null;
    this.bulletManager = null;
    this.networkManager = null;
    this.uiManager = null;
    this.isMobile = false;
    this.playButton = null;
    this.score = { host: 0, join: 0 };
  }

  setupGame() {
    this.detectDevice();
    this.initializeMenus();
    this.player = new Player(width / 2, height / 2);
    this.bulletManager = new BulletManager();
    this.networkManager = new NetworkManager();
  }

  detectDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  initializeMenus() {
    this.playButton = new Button("Play", width / 2, height / 2, 200, 100);
  }

  update() {
    if (this.menuIndex === 0) {
      this.handleMenu();
    } else if (this.menuIndex === 1) {
      this.runGame();
    }
  }

  handleMenu() {
    background(220);
    this.playButton.display();
    if (this.playButton.isClicked()) {
      this.menuIndex = 1;
    }
  }

  runGame() {
    background(200);
    this.player.update(this.isMobile);
    this.bulletManager.update(this.player);
    this.bulletManager.draw();
  }
}

class Player {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 20, 20);
    this.sprite.friction = 0.2;
    this.sprite.rotationLock = true;
    this.sprite.acceleration = 5;
  }

  update(isMobile) {
    if (isMobile) {
      // Add mobile controls here
    } else {
      this.handleKeyboardControls();
    }
    this.sprite.update();
  }

  handleKeyboardControls() {
    if (keyIsDown(LEFT_ARROW)) {
      this.sprite.velocity.x = -this.sprite.acceleration;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.sprite.velocity.x = this.sprite.acceleration;
    } else {
      this.sprite.velocity.x = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      this.sprite.velocity.y = -this.sprite.acceleration;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.sprite.velocity.y = this.sprite.acceleration;
    } else {
      this.sprite.velocity.y = 0;
    }
  }
}

class BulletManager {
  constructor() {
    this.bullets = [];
  }

  update(player) {
    if (mouseIsPressed) {
      this.shoot(player.sprite);
    }

    this.bullets = this.bullets.filter(bullet => bullet.life > 0);
    this.bullets.forEach(bullet => bullet.update());
  }

  shoot(playerSprite) {
    const bullet = createSprite(playerSprite.x, playerSprite.y, 10, 10);
    bullet.velocity.x = cos(playerSprite.rotation) * 10;
    bullet.velocity.y = sin(playerSprite.rotation) * 10;
    bullet.life = 120;
    this.bullets.push(bullet);
  }

  draw() {
    this.bullets.forEach(bullet => bullet.draw());
  }
}

class Button {
  constructor(label, x, y, width, height) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hovered = false;
  }

  display() {
    if (this.isHovered()) {
      fill(200, 50, 50);
    } else {
      fill(255);
    }
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.label, this.x, this.y);
  }

  isHovered() {
    this.hovered =
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2;
    return this.hovered;
  }

  isClicked() {
    return this.isHovered() && mouseIsPressed;
  }
}

class NetworkManager {
  constructor() {
    this.liveMedia = null;
  }

  setup() {
    this.liveMedia = new p5LiveMedia(this, "DATA", null, "game-room");
    this.liveMedia.on("data", this.onDataReceived);
  }

  send(data) {
    if (this.liveMedia) {
      this.liveMedia.send(JSON.stringify(data));
    }
  }

  onDataReceived(data) {
    console.log("Data received:", data);
  }
}
