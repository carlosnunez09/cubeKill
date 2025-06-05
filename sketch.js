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
let combo = "";
let gui;
let guiNEW;
//let r, o, y, g, b, v;
let mobile = false;
let score = { j: 0, h: 0 };
let wallsinfo;
let newplayer = { x: 0, y: 0 };
let player;
let offnewplayer;
let bufferplayer = { x: 0, y: 0 };
//only used by join player
let bullets = [];
let lookDegress;
//filter bullets only with life
let boxes = [];
let walls = [];
let menuindex = 0;
let load1 = false; //load of index game
let load2 = true; // load of index matching loby
let load3 = false; //laod of index clentGame
let load4 = false; // winnerm

let load0 = true; //meanu laod
let p5lm; //port 1 host most
let p5le; //port 2 join most
let p5ls; //port 3 score
let codeString;
let code;
let jsonString;

let buff = 0;

let dataToSend;

//clent
////
let bufferbullets = [];
let offbullets;


let idh;
let offplayer;
let bulletsBuffer = [];
let bulletX = [];
let bulletY = [];
let life = [];


//trun

let bulletXoff = [];
let bulletYoff = [];
let lifeoff = [];

let boxesX = [];
let boxesY = [];
let startload = true;
let data;
let wallsBuffer = [];

///

//items

let idin;
let idoff;

function touchMoved() {
  // do some stuff
  return false;
}


function setup() {
  //misc
  p5play.renderStats = true;
  world.gravity.y = 2;
  var canvasObject = createCanvas(windowWidth - 0, windowHeight - 0);
  background(220);





  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true
    print("mobile device");
  } else {
    // false for not mobile device
    mobile = false
    print("not mobile device");
  }
  guiNEW = createGui();

  r = createCheckbox("Checkbox", width * 0.2, height * 0.55, width * 0.3, height * 0.1);
  r.setStyle({
    fillBg: color("#FF0000"),
    rounding: 0,
  });
  //orange
  o = createCheckbox("Checkbox", width * 0.2, height * 0.65, width * 0.3, height * 0.1);
  o.setStyle({
    fillBg: color("#FF7D00"),
    rounding: 0,
  });
  //yellow
  y = createCheckbox("Checkbox", width * 0.2, height * 0.75, width * 0.3, height * 0.1);
  y.setStyle({
    fillBg: color("#FCFF00"),
    rounding: 0,
  });
  //green
  g = createCheckbox("Checkbox", width * 0.5, height * 0.55, width * 0.3, height * 0.1);
  g.setStyle({
    fillBg: color("#01FF00"),
    rounding: 0,
  });

  //blue
  b = createCheckbox("Checkbox", width * 0.5, height * 0.65, width * 0.3, height * 0.1);
  b.setStyle({
    fillBg: color("#007EFF"),
    rounding: 0,
  });

  //violet
  v = createCheckbox("Checkbox", width * 0.5, height * 0.75, width * 0.3, height * 0.1);
  v.setStyle({
    fillBg: color("#8100FF"),
    rounding: 0,
  });


  //load check boxes
  //p5.touch ui
  //make the chack boxes



  bigRadius = height / 3.0;

  console.log(1);

  //noCursor();
}

///index 0 play screen
///index 1 game
///index 2 matching lobby
///index 3 clintGame
// index 10 null

function draw() {


  world.gravity.y += 0.4;

  clear();
  background(220);

  //make menu manger


  //gloabal
  //^^^^^^^^^^^^^

  if (load0 == true) {
    //setup
    //print(0)
    //playbutton

    playbutton = new Sprite();
    playbutton.width = width / 3;
    playbutton.y = height / 1.5;
    playbutton.text = "play";
    playbutton.textSize = 45;
    playbutton.collider = "s";
    ///

    gameicon = new Sprite();
    gameicon.text = "CUBEHELL";
    //gameicon.shape = "chain";
    gameicon.stroke = "rgba(255,0,0,0)";
    gameicon.color = "#DCDCDC";
    gameicon.collider = "none";
    gameicon.y = height / 4;
    gameicon.textSize = 40;

    //mosue
    mosuesObjout = new Sprite();
    mosuesObjIn = new Sprite();
    mosuesObjout.diameter = 13;
    mosuesObjIn.diameter = 4;
    mosuesObjIn.collider = "none";
    mosuesObjout.collider = "none";
    //

    infinity = new Group();
    infinity.width = 10;
    infinity.collider = "dynamic";

    infinity.vel.x = -6;
    infinity.life = 130;

    wallofinfiinty = new Sprite(
      width * 0.03,
      height / 2,
      width * 0.04,
      height * 0.5
    );

    wallofinfiinty.collider = "s";

    load0 = false;
  }

  if (menuindex == 0) {
    //draw
    fill(255, 0, 0);

    mosuesObjout.moveTowards(mouse, 0.06);
    mosuesObjIn.moveTowards(mouse, 0.6);

    line(mosuesObjIn.x, mosuesObjIn.y, mosuesObjout.x, mosuesObjout.y);
    // print("w")

    if (mosuesObjIn.overlapping(playbutton)) {
      playbutton.stroke = "red";
      if (mouse.pressing()) {
        playbutton.remove();
        gameicon.remove();

        //infinity.removeAll()
        wallofinfiinty.remove();

        menuindex = 2;
      }
    } else {
      playbutton.stroke = "rgb(0,0,0)";
    }

    new infinity.Sprite(gameicon.x + 20, gameicon.y + 20, 10, 10);

    return;
  }

  if (load2 == true) {

    world.gravity.y = 0;
    gameicon = new Sprite();
    gameicon.text = "choose a role";
    //gameicon.shape = "chain";
    gameicon.stroke = "rgba(255,0,0,0)";
    gameicon.color = "#DCDCDC00";
    gameicon.collider = "none";
    gameicon.y = height / 4;
    gameicon.x = width / 2;
    gameicon.textSize = 40;
    ////
    gameInstruction = new Sprite();
    gameInstruction.text = "select the same color as other player make sure it's available  \n when you see a cube that is is moving shoot it\nNote:\n Host moves objects better";

    gameInstruction.stroke = "rgba(255,0,0,0)";
    gameInstruction.color = "#DCDCDC00";
    gameInstruction.collider = "none";
    gameInstruction.y = height / 3;
    gameInstruction.x = width / 2;
    gameInstruction.textSize = 15;



    ///
    loadani = new Sprite();
    loadani.x = width - 50;
    loadani.y = height - 50;

    loadani.rotationSpeed = 1;
    //sprite.visible = false;
    ///

    joinbutton = new Sprite();
    joinbutton.width = width / 3;
    joinbutton.x = width / 3;
    joinbutton.text = "join";
    joinbutton.textSize = 45;
    joinbutton.collider = "s";

    hostbutton = new Sprite();
    hostbutton.width = width / 3;
    hostbutton.x = width / 1.5;
    hostbutton.text = "host";
    hostbutton.textSize = 45;
    hostbutton.collider = "s";












    load2 = false;
  }

  if (menuindex == 2) {
    drawGui();
    //text("Select the same color as other player",width *0.5, height*0.5)
    mosuesObjout.moveTowards(mouse, 0.06);
    mosuesObjIn.moveTowards(mouse, 0.6);
    line(mosuesObjIn.x, mosuesObjIn.y, mosuesObjout.x, mosuesObjout.y);
    //new infinity.Sprite(gameicon.x, gameicon.y, 10, 10);


    ///loby---

    //two buttons  ---/hostgame/joingame

    if (mosuesObjIn.overlapping(joinbutton)) {
      //join

      joinbutton.stroke = "red";
      if (mouse.pressing()) {
        if (r.val == true) {
          combo += "r"
        }
        if (o.val == true) {
          combo += "o"
        }
        if (y.val == true) {
          combo += "y"
        }
        if (g.val == true) {
          combo += "g"

        }
        if (b.val == true) {
          combo += "b"
        }
        if (v.val == true) {
          combo += "v"
        }


        load3 = true;
        gameicon.remove();
        gameInstruction.remove()
        loadani.remove();
        joinbutton.remove();
        hostbutton.remove();
        //draw and compute boxes
        menuindex = 3;




        print(combo);
        //recinving port 1
        p5lm = new p5LiveMedia(this, "DATA", null, combo);
        p5lm.on("data", gotData);
        p5lm.on("disconnect", gotDisconnect);

        //sending port 2
        p5le = new p5LiveMedia(this, "DATA", null, combo + 1);
        p5le.on("data", gotData1);
        p5le.on("disconnect", gotDisconnect);

        //port 3 score
        p5ls = new p5LiveMedia(this, "DATA", null, combo + 2);
        p5ls.on("data", gotScore);
        p5ls.on("disconnect", gotDisconnect);
      }
    } else {
      joinbutton.stroke = "rgb(0,0,0)";
    }

    if (mosuesObjIn.overlapping(hostbutton)) {
      hostbutton.stroke = "red";
      if (mouse.pressing()) {
        if (r.val == true) {
          combo += "r"
        }
        if (o.val == true) {
          combo += "o"
        }
        if (y.val == true) {
          combo += "y"
        }
        if (g.val == true) {
          combo += "g"

        }
        if (b.val == true) {
          combo += "b"
        }
        if (v.val == true) {
          combo += "v"
        }

        //make the rest and add it to join

        //combo maker


        print(combo)

        menuindex = 1;
        load1 = true;
        gameicon.remove();
        gameInstruction.remove()
        loadani.remove();
        joinbutton.remove();
        hostbutton.remove();

        //sending port 1

        p5lm = new p5LiveMedia(this, "DATA", null, combo);
        p5lm.on("data", gotData);
        p5lm.on("disconnect", gotDisconnect);


        //recivng
        //p5le port 2
        p5le = new p5LiveMedia(this, "DATA", null, combo + 1);
        p5le.on("data", gotData1);
        p5le.on("disconnect", gotDisconnect);

        //port 3 score
        p5ls = new p5LiveMedia(this, "DATA", null, combo + 2);
        p5ls.on("data", gotScore);
        p5ls.on("disconnect", gotDisconnect);
      }
    } else {
      hostbutton.stroke = "rgb(0,0,0)";
    }

    return;
  }

  if(load4 == true)
  {
    print("laod printout")

    load4 = false;
    
  }
  if(menuindex == 4)
  {
    
  }

  
  /*
     ----------------------
  _                     _ 
 | |                   | |  
 | |__     ___    ___  | |_
 | '_ \   / _ \  / __| | __|
 | | | | | (_) | \__ \ | |_ 
 |_| |_|  \___/  |___/  \__|                            
   -------------------------
    
    
    */

  if (load1 == true) {
    //val



    //set contorlls

    if (mobile) {


      gui = createGui();

      j = createJoystick("Joystick", width * 0.1, height * 0.6, 200, 200, -1, 1, 1, -1);


      l = createJoystick("Joystick", width * 0.7, height * 0.6, 200, 200, -1, 1, 1, -1);

      s = createButton("Button", width * 0.7, height * 0.54, 200, 50);

      sAlt = createButton("Button", width * 0.1, height * 0.54, 200, 50);//x and y fix
    }



    stroke(0);
    //fill(255, 255, 255);
    let newbulletY = [];
    let newbulletX = [];

    //sending
    ///////p5lm port 1

    //removeItem("code");
    //code.remove()

    /////stat_bullets of shooting
    bulletstartPlate = new Sprite();
    bulletstartPlate.width = width / 2;
    bulletstartPlate.height = 0.02 * height;
    bulletstartPlate.collider = "none";
    bulletstartPlate.y = height / 1.03;
    bulletstartPlate.color = "rgb(0,0,0)";
    /////
    /////
    bulletstart = new Sprite();
    bulletstart.width = width / 2;
    bulletstart.height = 0.02 * height;
    bulletstart.collider = "none";
    bulletstart.y = height / 1.03;
    bulletstart.color = "#79D89D";
    ////

    id = createSprite(0, 0, 5, 5);
    id.collion = "n"
    id.color = "blue"



    player = createSprite(width / 2, height / 2, 20, 20);
    player.friction = 0.2;
    player.acceleration = 3;
    player.mass = 0.00000008;
    player.rotationLock = true;
    player.stroke = "blue";
    //offnewplace

    offnewplayer = createSprite(width / 2, height / 2, 20, 20);
    offnewplayer.friction = 0.0;
    offnewplayer.mass = 20000;
    //offnewplayer.acceleration = 3;
    //offnewplayer.collider = "k"
    //add a sprite that is offset to the player view so it can viauly understand were it is looking

    //boxes
    for (let i = 0; i < random(60, 120); i++) {
      let box = createSprite(random(width), random(height), 30, 30);
      box.mass = 3
      box.friction = 2;
      box.drag = 6;
      box.rotationDrag = 4;

      boxes.push(box);
    }

    let topWall = createSprite(random(width), random(height), width + 60, 20);
    let bottomWall = createSprite(
      random(width),
      random(height),
      width + 20,
      20
    );
    let leftWall = createSprite(+60, random(height), 20, height - 20);
    let rightWall = createSprite(width + 10, random(height), 20, height + 20);

    walls.push(topWall);
    walls.push(bottomWall);
    walls.push(leftWall);
    walls.push(rightWall);
    walls[1].collider = "static";

    //mosue

    text("word", 10, 30);

    load1 = false;
  }
  //start

  if (menuindex == 1) {
    background(220);


    ///************mobile
    if (mobile) {
      drawGui();

      if (j.isChanged) {
      }
      else {
      }
      velX = 0
      velY = 0
      // Use Joystick's output to change velocity
      velX += j.valX;
      velY += j.valY;

      // Draw our ellipse
      fill("#7AA0FF");

      //move
      player.velocity.x = player.acceleration * velX;
      player.velocity.y = player.acceleration * velY;
      //look

      let newLookvalue = {
        x: l.valX,
        y: l.valY
      }

      if (l.isChanged && newLookvalue.x != 0) {


        print(newLookvalue)
        lookDegress = Math.atan2(newLookvalue.x, newLookvalue.y) * 180 / Math.PI

        player.rotation = -lookDegress + 90;
        //player.rotateTowards(lookDegress, 1)
      }
      if (bulletstart.width > 1) {
        if (sAlt.isHeld || sAlt.isPressed || s.isHeld || s.isPressed) {
          let bullet = createSprite(player.position.x, player.position.y, 10, 10);
          bullet.stroke = "blue";
          bullet.strokeWeight = 3;
          bullet.mass = 0.008; // fair advantage bug
          bullet.velocity.x = cos(player.rotation) * 10;
          bullet.velocity.y = sin(player.rotation) * 10;
          bullet.life = 140;
          bullets.push(bullet);
          bulletstart.width -= width * 0.003;
          buff = 0;

        }
      }



    }

    let xc = constrain(player.x, 0 + 20, width - 20)
    let yc = constrain(player.y - 20, 0 + 20, height - 20)



    id.pos = { x: xc, y: yc }

    //contrain






    // Player movement
    if (!mobile) {
      mosuesObjout.moveTowards(mouse, 0.06);
      mosuesObjIn.moveTowards(mouse, 1);
      line(mosuesObjIn.x, mosuesObjIn.y, mosuesObjout.x, mosuesObjout.y);
      player.velocity.x = 0;
      player.velocity.y = 0;

      if (kb.pressing("left")) {
        player.velocity.x = -player.acceleration;
      } else if (kb.pressing("right")) {
        player.velocity.x = player.acceleration;
      }

      if (kb.pressing("up")) {
        player.velocity.y = -player.acceleration;
      } else if (kb.pressing("down")) {
        player.velocity.y = player.acceleration;
      }

      player.rotateTowards(mosuesObjout, 1);
    }
    player.update();

    player.velocity.limit(8);

    //track mouse



    if (buff > 200 && bulletstart.width < width / 2) {
      bulletstart.width += width * 0.003;
    }
    // Shooting
    buff += 1;
    if (!mobile) {
      if (mouse.pressing() && bulletstart.width > 1) {
        let bullet = createSprite(player.position.x, player.position.y, 10, 10);
        bullet.stroke = "blue";
        bullet.strokeWeight = 3;
        bullet.mass = 0.008; // fair advantage bug
        bullet.velocity.x = cos(player.rotation) * 10;
        bullet.velocity.y = sin(player.rotation) * 10;
        bullet.life = 140;
        bullets.push(bullet);
        bulletstart.width -= width * 0.003;
        buff = 0;

        ///cleen and filter the bullets array

        //let activeBullets = 0;
        ///amount
      }
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      if (bullets[i].life <= 0) {
        bullets[i].remove();
        bullets.splice(i, 1);
      }
    }

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].draw();
      //friction
      //boxes[i].friction = 2;
      //boxes[i].drag = 6;
      //boxes[i].rotationDrag = 4;
    }
    for (let i = 0; i < walls.length; i++) {
      walls[i].draw();
      // walls[i].rotationSpeed = 0.08;

      //friction
    }

    //place bullets and player or move

    offnewplayer.x = bufferplayer.x;
    offnewplayer.y = bufferplayer.y;
    offnewplayer.rotation = bufferplayer.r;

    if (bulletsBuffer.length < lifeoff.length) {
      for (let i = bulletsBuffer.length; i < lifeoff.length; i++) {
        let bullet = createSprite(bulletXoff[i], bulletYoff[i], 10, 10);
        bullet.stroke = "red";
        bullet.strokeWeight = 3;
        bullet.collider = "d";
        bullet.mass = 100;
        bullet.life = lifeoff[i];
        bulletsBuffer.push(bullet);
      }
    } else if (bulletsBuffer.length > lifeoff.length) {
      // Remove extra sprites if bulletsBuffer is longer than life
      for (let i = bulletsBuffer.length - 1; i >= lifeoff.length; i--) {
        bulletsBuffer[i].remove();
        bulletsBuffer.splice(i, 1);
      }
    }
    for (let i = bulletsBuffer.length - 1; i >= 0; i--) {
      if (bulletsBuffer[i].life <= 1) {
        bulletsBuffer[i].remove();
        bulletsBuffer.splice(i, 1);
      }
    }
    for (let i = 0; i < lifeoff.length; i++) {
      bulletsBuffer[i].y = bulletYoff[i];
      bulletsBuffer[i].x = bulletXoff[i];
    }

    ///////amount of bullets is bad i need to fix it
    ///colision checker
    for (let i = 0; i < bullets.length; i++) {
      for (let b = 0; b < boxes.length; b++) {
        if (bullets[i].collided(boxes[b])) {
          boxes[b].stroke = "rgb(255,0,0)";
          //resetLoby(1)
        }
      }
    }
    ///
    //eaxaple with boxes

    ///player(player) collion and if  colide with bullest(bulletsBuffer)

    //if this(host) player gets hit by offbulles lose
    for (let i = 0; i < bulletsBuffer.length; i++) {
      if (player.collides(bulletsBuffer[i])) {
        player.stroke = "rgb(255,0,0)";
        resetLoby(2);

        //resetLoby();
        //reset game
        //++ enamy ff
        //function reset will move ccubes refill stamina and reset posisons
      }
    }
    //this(host) player hit offplayer(offnewplayer)
    for (let i = 0; i < bullets.length; i++) {
      if (offnewplayer.collides(bullets[i])) {
        offnewplayer.stroke = "rgb(255,0,0)";
        resetLoby(1);
      }
    }

    //display score
    textSize(width / 29)
    fill("blue");
    text(score.h, width * 0.05, height * 0.06);
    fill("red");
    text(score.j, width * 0.1, height * 0.06);

    /*
     --------------------------------------------------------------------
     .___       __             __                                     .___
  __| _/____ _/  |______    _/  |_  ____     ______ ____   ____    __| _/
 / __ |\__  \\   __\__  \   \   __\/  _ \   /  ___// __ \ /    \  / __ | 
/ /_/ | / __ \|  |  / __ \_  |  | (  <_> )  \___ \\  ___/|   |  \/ /_/ | 
\____ |(____  /__| (____  /  |__|  \____/  /____  >\___  >___|  /\____ | 
     \/     \/          \/                      \/     \/     \/      \/  TM
    --------------------------------------------------------------------       
    */

    ////////////////////bullets
    let newbulletY = [];
    let newbulletX = [];
    let newbulletLife = [];
    ///////////////////////boxes
    let newboxesX = [];
    let newboxesY = [];
    let newboxesRot = [];
    let wallsinfo = [];
    //////////////////////player
    //player has no verables since only have one for now;

    //boxes
    for (var i = 0; i < boxes.length; i++) {
      //remove the
      newboxesX.push(boxes[i].x);
      newboxesY.push(boxes[i].y);
      newboxesRot.push(boxes[i].rotation);
    }

    //bullets
    for (var i = 0; i < bullets.length; i++) {
      newbulletY.push(bullets[i].y);
      newbulletX.push(bullets[i].x);
      newbulletLife.push(bullets[i].life);
    }

    //walls

    for (var i = 0; i < walls.length; i++) {
      let wallsinfoTemp = {
        x: walls[i].x,
        y: walls[i].y,
        w: walls[i].width,
        h: walls[i].height,
        r: walls[i].rotation, /// walls rotation dont have truck since rotattion needs detils
      };
      wallsinfo.push(wallsinfoTemp);
    }

    //player
    const playerinfo = {
      x: player.x,
      y: player.y,
      r: player.rotation,
    };

    //n/a

    const dataToSend = {
      //world data send
      bulletsy: newbulletY,
      bulletsX: newbulletX,
      lifebullet: newbulletLife,
      boxesX: newboxesX,
      boxesY: newboxesY,
      boxesRot: newboxesRot,
      player: playerinfo,
      walls: wallsinfo,
      //lifeBullet: newbulletLife,
    };

    CryptoHelper.encrypt(dataToSend).then(enc => p5lm.send(enc));
    //-----------------------------------------
    //recived
  }
  /*
     ----------------------
    _           _           
   (_)         (_)          
    _    ___    _   _ __    
   | |  / _ \  | | | '_ \   
   | | | (_) | | | | | | |  
   | |  \___/  |_| |_| |_|  
  _/ |                      
 |__/                       
    -------------------------
    
    
    */
  if (load3 == true) {
    stroke(0);
    fill(255, 0, 0);
    //load controlls



    if (mobile) {


      gui = createGui();

      j = createJoystick("Joystick", width * 0.1, height * 0.6, 200, 200, -1, 1, 1, -1);


      l = createJoystick("Joystick", width * 0.7, height * 0.6, 200, 200, -1, 1, 1, -1);

      s = createButton("Button", width * 0.7, height * 0.54, 200, 50);

      sAlt = createButton("Button", width * 0.1, height * 0.54, 200, 50);//x and y fix
    }


    load3 = false;

    //offplayer
    //playe creation
    bulletstartPlate = new Sprite();
    bulletstartPlate.width = width / 2;
    bulletstartPlate.height = 0.02 * height;
    bulletstartPlate.collider = "none";
    bulletstartPlate.y = height / 1.03;
    bulletstartPlate.color = "rgb(0,0,0)";

    bulletstart = new Sprite();
    bulletstart.width = width / 2;
    bulletstart.height = 0.02 * height;
    bulletstart.collider = "none";
    bulletstart.y = height / 1.03;
    bulletstart.color = "#79D89D";

    player = createSprite(width / 2, height / 2, 20, 20);
    player.friction = 0.4;
    player.mass = 20000;
    player.acceleration = 3;
    player.rotationLock = true;
    player.stroke = "blue";





    offplayer = createSprite(width / 2, height / 2, 20, 20);
    offplayer.mass = 0


    idh = createSprite(0, 0, 5, 5);
    idh.collion = "n"
    idh.color = "blue"


  }

  if (menuindex == 3) {
    background(220);



    if (mobile) {
      drawGui();

      if (j.isChanged) {
      }
      else {
      }
      velX = 0
      velY = 0
      // Use Joystick's output to change velocity
      velX += j.valX;
      velY += j.valY;
      // Draw our ellipse
      fill("#7AA0FF");
      //move
      player.velocity.x = player.acceleration * velX;
      player.velocity.y = player.acceleration * velY;
      //look
      let newLookvalue = {
        x: l.valX,
        y: l.valY
      }
      if (l.isChanged && newLookvalue.x != 0) {
        print(newLookvalue)
        let lookDegress = Math.atan2(newLookvalue.x, newLookvalue.y) * 180 / Math.PI
        player.rotation = -lookDegress + 90;
        //player.rotateTowards(lookDegress, 1)
      }
      if (bulletstart.width > 1) {
        if (sAlt.isHeld || sAlt.isPressed || s.isHeld || s.isPressed) {
          let bullet = createSprite(player.position.x, player.position.y, 10, 10);
          bullet.stroke = "blue";
          bullet.strokeWeight = 3;
          bullet.mass = 0.008; // fair advantage bug
          bullet.velocity.x = cos(player.rotation) * 10;
          bullet.velocity.y = sin(player.rotation) * 10;
          bullet.life = 140;
          bullets.push(bullet);
          bulletstart.width -= width * 0.003;
          buff = 0;

        }
      }

    }
    let xc = constrain(player.x, 0 + 20, width - 20)
    let yc = constrain(player.y - 20, 0 + 20, height - 20)
    idh.pos = { x: xc, y: yc }

    //ellipse(x,y,100,100);
    if (!mobile) {

      mosuesObjout.moveTowards(mouse, 0.06);
      mosuesObjIn.moveTowards(mouse, 0.6);
      line(mosuesObjIn.x, mosuesObjIn.y, mosuesObjout.x, mosuesObjout.y);

      player.velocity.x = 0;
      player.velocity.y = 0;

      if (kb.pressing("left")) {
        player.velocity.x = -player.acceleration;
      } else if (kb.pressing("right")) {
        player.velocity.x = player.acceleration;
      }

      if (kb.pressing("up")) {
        player.velocity.y = -player.acceleration;
      } else if (kb.pressing("down")) {
        player.velocity.y = player.acceleration;
      }
      player.rotateTowards(mosuesObjout, 1);
    }
    player.update();

    player.velocity.limit(8);

    //track mouse



    if (buff > 200 && bulletstart.width < width / 2) {
      bulletstart.width += width * 0.003;
    }
    // Shooting
    buff += 1;
    if (!mobile) {
      if (mouse.pressing() && bulletstart.width > 1) {
        let bullet = createSprite(player.position.x, player.position.y, 10, 10);
        bullet.stroke = "blue";
        bullet.strokeWeight = 3;
        bullet.velocity.x = cos(player.rotation) * 10;
        bullet.velocity.y = sin(player.rotation) * 10;
        bullet.life = 140;
        bullets.push(bullet);
        bulletstart.width -= width * 0.003;
        buff = 0;

        ///cleen and filter the bullets array

        //let activeBullets = 0;
        ///amount
      }
    }
    for (let i = bullets.length - 1; i >= 0; i--) {
      if (bullets[i].life <= 0) {
        bullets[i].remove();
        bullets.splice(i, 1);
      }
    }





    //displayscore
    textSize(width / 29)
    fill("red");
    text(score.h, width * 0.05, height * 0.06);
    fill("blue");
    text(score.j, width * 0.1, height * 0.06);

    /*
    //*******************************************
    .___       __             __                  .__                       
  __| _/____ _/  |______    _/  |_  ____   ______ |  | _____    ____  ____  
 / __ |\__  \\   __\__  \   \   __\/  _ \  \____ \|  | \__  \ _/ ___\/ __ \ 
/ /_/ | / __ \|  |  / __ \_  |  | (  <_> ) |  |_> >  |__/ __ \\  \__\  ___/ 
\____ |(____  /__| (____  /  |__|  \____/  |   __/|____(____  /\___  >___  >
     \/     \/          \/                 |__|             \/     \/    \/ 

    //******************************************
    */

    //offplayer.x = 400
    //player
    offplayer.x = newplayer.x;
    offplayer.y = newplayer.y;
    offplayer.rotation = newplayer.r;

    rect(newplayer.x, newplayer.y, 5, 5);

    if (startload == true && boxesX[3] != null) {
      //boxes
      for (let i = 0; i < boxesX.length; i++) {
        let box = createSprite(boxesX[i], boxesY[i], 30 - 5.5, 30 - 5.5);
        box.collider = "k";
        box.mass = 0

        boxes.push(box);
      }
      //walls
      for (let i = 0; i < walls.length; i++) {
        let wall = createSprite(
          walls[i].x,
          walls[i].y,
          walls[i].w - 1.5,
          walls[i].h - 1.5
        );
        // match host's dynamic behavior so join player can move walls
        if (i === 1) {
          wall.collider = "static";
        } else {
          wall.collider = "d";
        }
        wall.mass = 1;
        wallsBuffer.push(wall);
      }
      startload = false;
    }
    for (let i = 0; i < wallsBuffer.length; i++) {
      wallsBuffer[i].x = walls[i].x;
      wallsBuffer[i].y = walls[i].y;
      wallsBuffer[i].rotation = walls[i].r;
    }
    //boxes x and y and r
    for (let i = 0; i < boxesX.length; i++) {
      boxes[i].x = boxesX[i];
      boxes[i].y = boxesY[i];
      boxes[i].rotation = boxesRot[i];
    }

    //bullets
    if (bulletsBuffer.length < life.length) {
      for (let i = bulletsBuffer.length; i < life.length; i++) {
        let bullet = createSprite(bulletX[i], bulletY[i], 10, 10);
        bullet.stroke = "red";
        bullet.strokeWeight = 3;
        bullet.mass = 2;
        bullet.life = life[i];
        bulletsBuffer.push(bullet);
      }
    } else if (bulletsBuffer.length > life.length) {
      // Remove extra sprites if bulletsBuffer is longer than life
      for (let i = bulletsBuffer.length - 1; i >= life.length; i--) {
        bulletsBuffer[i].remove();
        bulletsBuffer.splice(i, 1);
      }
    }
    for (let i = bulletsBuffer.length - 1; i >= 0; i--) {
      if (bulletsBuffer[i].life <= 1) {
        bulletsBuffer[i].remove();
        bulletsBuffer.splice(i, 1);
      }
    }
    for (let i = 0; i < life.length; i++) {
      bulletsBuffer[i].y = bulletY[i];
      bulletsBuffer[i].x = bulletX[i];
    }
  }

  //send data

  let newbulletYoff = [];
  let newbulletXoff = [];
  let newbulletLifeoff = [];

  ////////reomve truck for testing
  for (var i = 0; i < bullets.length; i++) {
    newbulletYoff.push(bullets[i].y);
    newbulletXoff.push(bullets[i].x);
    newbulletLifeoff.push(bullets[i].life);
  }

  //player
  const playerinfo1 = {
    x: player.x,
    y: player.y,
    r: player.rotation,
  };

  const dataToSend1 = {
    //world data send

    player: playerinfo1,
    bulletsy: newbulletYoff,
    bulletsX: newbulletXoff,
    lifebullet: newbulletLifeoff,
    //lifeBullet: newbulletLife,
  };

  CryptoHelper.encrypt(dataToSend1).then(enc => p5le.send(enc));
}


//////

function resetLoby(winner) {
  //host is 1
  //join is 2
  //bulletstart.width += width / 2;

  if (winner == 1) {
    score.h++;
    winnerScreen(1);

  } else {
    score.j++;
    winnerScreen(2);
  }
  
  //print("winner" +score.j +"||"+ score.h)
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].x = random(width);
    boxes[i].y = random(height);
  }
  //players respown
  player.pos = { x: random(width), y: random(height) };
  //walls random
  for (let i = 0; i < walls.length; i++) {
    walls[i].pos = { x: random(width), y: random(height) };
  }
  //despawn all bullest
  bullets.removeAllCurrent();
  //restore stamina

  //send who won and score ,in new thread?
  const datatosend3 = {
    winner: winner,
    score: score,
  };

  print(datatosend3);
  CryptoHelper.encrypt(datatosend3).then(enc => p5ls.send(enc));



  
}




function winnerScreen(winner) {
  //objectiveWinner = rect(500,500,500,500)

  pauseCanvas(50);
  print("winner reset plus");

  load1 == false;
  
  load4 == true;

  menuidex = 4;

  

}


/////////////////////////////////////////////

//////



//unpack
function gotDisconnect(id) {
  //back to main menu
  //menuindex = 0;
}

function gotScore(data, id) {
  let s = JSON.parse(data);
  score = s.score;
  print(s);

  player.pos = { x: random(width), y: random(height) };

  bullets.removeAllCurrent();

  //reset and state who won
}

async function gotData1(data, id) {
  const d = await CryptoHelper.decrypt(data);
  bufferplayer = d.player;
  bulletXoff = d.bulletsX;
  bulletYoff = d.bulletsy;
  lifeoff = d.lifebullet;
}

async function gotData(data, id) {
  const d = await CryptoHelper.decrypt(data);
  bulletX = d.bulletsX;
  bulletY = d.bulletsy;
  life = d.lifebullet;
  boxesX = d.boxesX;
  boxesY = d.boxesY;
  boxesRot = d.boxesRot;
  newplayer = d.player;
  walls = d.walls;
}
//stolen: takes inn the type and leangth and removes one by one
Array.prototype.removeAll = function() {
  for (var i = 0; i < this.length; i++) {
    this[i].remove();
  }
  this.length = 0;
};





//modedv2f fro bullets: same function as above but it will take the real amount of bullets to delite insted of all that lived erorrw
Array.prototype.removeAllCurrent = function() {
  for (let i = this.length - 1; i >= 0; i--) {
    if (this[i] && typeof this[i].remove === 'function') {
      this[i].remove();
    }
    this.splice(i, 1);
  }
  this.length = 0;
};


function pauseCanvas(timeInSeconds) {
  isPaused = true;
  setTimeout(function() {
    isPaused = false;
    requestAnimationFrame(draw);
  }, timeInSeconds * 1000); // Convert seconds to milliseconds
}
