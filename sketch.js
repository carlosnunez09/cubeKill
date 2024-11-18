// Refactored code for better readability and maintainability

class Game {
  constructor() {
    this.combo = "";
    this.score = { j: 0, h: 0 };
    this.mobile = false;
    this.menuIndex = 0;
    this.buff = 0;
    this.loadStates = {
      load0: true,
      load1: false,
      load2: true,
      load3: false,
      load4: false
    };
    this.bullets = [];
    this.boxes = [];
    this.walls = [];
    this.bulletsBuffer = [];
    this.setupMobileCheck();
  }

  setupMobileCheck() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.mobile = true;
      console.log("Mobile device detected");
    } else {
      this.mobile = false;
      console.log("Not a mobile device");
    }
  }

  setup() {
    world.gravity.y = 2;
    createCanvas(windowWidth, windowHeight);
    background(220);
    this.setupGUI();
    this.initializeMenu();
  }

  setupGUI() {
    this.guiNEW = createGui();
    // Define checkboxes for color selection
    this.r = this.createColorCheckbox("#FF0000", width * 0.2, height * 0.55);
    this.o = this.createColorCheckbox("#FF7D00", width * 0.2, height * 0.65);
    this.y = this.createColorCheckbox("#FCFF00", width * 0.2, height * 0.75);
    this.g = this.createColorCheckbox("#01FF00", width * 0.5, height * 0.55);
    this.b = this.createColorCheckbox("#007EFF", width * 0.5, height * 0.65);
    this.v = this.createColorCheckbox("#8100FF", width * 0.5, height * 0.75);
  }

  createColorCheckbox(color, x, y) {
    let checkbox = createCheckbox("Checkbox", x, y, width * 0.3, height * 0.1);
    checkbox.setStyle({
      fillBg: color(color),
      rounding: 0,
    });
    return checkbox;
  }

  initializeMenu() {
    if (this.loadStates.load0) {
      this.playButton = new Sprite();
      this.playButton.width = width / 3;
      this.playButton.y = height / 1.5;
      this.playButton.text = "play";
      this.playButton.textSize = 45;
      this.playButton.collider = "s";
      this.gameIcon = this.createGameIcon();
      this.loadStates.load0 = false;
    }
  }

  createGameIcon() {
    let gameIcon = new Sprite();
    gameIcon.text = "CUBEHELL";
    gameIcon.stroke = "rgba(255,0,0,0)";
    gameIcon.color = "#DCDCDC";
    gameIcon.collider = "none";
    gameIcon.y = height / 4;
    gameIcon.textSize = 40;
    return gameIcon;
  }

  draw() {
    world.gravity.y += 0.4;
    clear();
    background(220);

    if (this.menuIndex === 0) {
      this.drawMainMenu();
    } else if (this.menuIndex === 2) {
      this.drawLobby();
    } else if (this.menuIndex === 1) {
      this.runGame();
    }
  }

  drawMainMenu() {
    fill(255, 0, 0);
    this.playButton.draw();
    if (mouseIsPressed && this.playButton.overlapping(mouse)) {
      this.startLobby();
    }
  }

  startLobby() {
    this.menuIndex = 2;
    this.loadStates.load2 = true;
  }

  drawLobby() {
    // Draw lobby UI and manage roles
  }

  runGame() {
    // Handle game logic, player movement, bullet handling, etc.
  }
}

class Player {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 20, 20);
    this.sprite.friction = 0.2;
    this.sprite.acceleration = 3;
    this.sprite.mass = 0.00000008;
    this.sprite.rotationLock = true;
    this.sprite.stroke = "blue";
  }

  update() {
    this.sprite.update();
    this.sprite.velocity.limit(8);
  }

  draw() {
    this.sprite.draw();
  }
}

class Bullet {
  constructor(x, y, rotation) {
    this.sprite = createSprite(x, y, 10, 10);
    this.sprite.stroke = "blue";
    this.sprite.strokeWeight = 3;
    this.sprite.mass = 0.008;
    this.sprite.velocity.x = cos(rotation) * 10;
    this.sprite.velocity.y = sin(rotation) * 10;
    this.sprite.life = 140;
  }

  update() {
    this.sprite.update();
  }
}

let game;
function setup() {
  game = new Game();
  game.setup();
}

function draw() {
  game.draw();
}
