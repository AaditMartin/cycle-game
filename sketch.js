var path, cycle, bell;
var p1, p2, p3;
var pathimg, racerimg1, racerimg2;
var pinkimg1, pinkimg2;
var yellowimg1, yellowimg2
var redimg1, redimg2;
var pinkgrp, yellowgrp, redgrp;

var gamestate = "play";
var play = 1;
var end = 0;

var distance = 0;
var gameover, reset;

function preload() {
  pathimg = loadImage("images/Road.png");
  racerimg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  racerimg2 = loadAnimation("images/mainPlayer3.png");
  pinkimg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  pinkimg2 = loadAnimation("images/opponent3.png");
  yellowimg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  yellowimg2 = loadAnimation("images/opponent6.png");
  redimg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  redimg2 = loadAnimation("images/opponent9.png");
  gameoverimg = loadImage("images/gameOver.png");
  bell = loadSound("sound/bell.mp3");
}

function setup() {
  createCanvas(1200, 300);
  
  path = createSprite(100, 150);
  path.addImage(pathimg);
  path.velocityX = -5;
  
  cycle = createSprite(70, 150);
  cycle.addAnimation("racing", racerimg1);
  cycle.scale = 0.07;
  
  gameover = createSprite(650, 150);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  pinkgrp = new Group();
  yellowgrp = new Group();
  redgrp = new Group();
}

function draw() {
  background(0);

  drawSprites();

  textSize(20);
  fill(255);
  text("distance:" + distance, 900, 30);

  if (gamestate === "play") {
    distance = distance + Math.round(frameCount/50);
    path.velocityX = -(6 + 2 * distance / 150);

    cycle.y = World.mouseY;

    edges = createEdgeSprites();
    cycle.collide(edges);

    if (path.x < 0) {
      path.x = width/2;
    }

    if (keyDown("space")) {
      bell.play();
    }

    var select_oppPlayer = Math.round(random(1, 3));

    if (frameCount % 250 === 0) {
      if (select_oppPlayer == 1) {
        createp1();
      } else if (select_oppPlayer == 2) {
        createp2();
      } else {
        createp3();
      }
    }

    if (pinkgrp.isTouching(cycle)) {
      gamestate = end;
      p1.velocityY = 0;
      p1.addAnimation("player1", pinkimg2);
    }

    if (yellowgrp.isTouching(cycle)) {
      gamestate = end;
      p2.velocityY = 0;
      p2.addAnimation("player2", yellowimg2);
    }

    if (redgrp.isTouching(cycle)) {
      gamestate = end;
      p3.velocityY = 0;
      p3.addAnimation("player3", redimg2);
    }

  } else if (gamestate === end) {
    gameover.visible = true;
    textSize(20);
    fill(255);
    text("press up arrow to restart the game!!!", 500, 200);

    path.velocityX = 0;
    cycle.velocityY = 0;
    cycle.addAnimation("racing", racerimg2);

    pinkgrp.setVelocityXEach(0);
    pinkgrp.setLifetimeEach(-1);

    yellowgrp.setVelocityXEach(0);
    yellowgrp.setLifetimeEach(-1);

    redgrp.setVelocityXEach(0);
    redgrp.setLifetimeEach(-1);

    if (keyDown("up")) {
      reset();
    }
  }
}

function createp1() {
  p1 = createSprite(1100, Math.round(random(50, 250)));
  p1.addAnimation("player1", pinkimg1);
  p1.scale = 0.06;
  p1.velocityX = -(6 + 2 * distance/150);
  p1.setLifetime = 170;
  pinkgrp.add(p1);
}

function createp2() {
  p2 = createSprite(1100, Math.round(random(50, 250)));
  p2.addAnimation("player2", yellowimg1);
  p2.scale = 0.06;
  p2.velocityX = -(6 + 2 * distance/150);
  p2.setLifetime = 170;
  yellowgrp.add(p2);
}

function createp3() {
  p3 = createSprite(1100, Math.round(random(50, 250)));
  p3.addAnimation("player3", redimg1);
  p3.scale = 0.06;
  p3.velocityX = -(6 + 2 * distance/150);
  p3.setLifetime = 170;
  redgrp.add(p3);
}

function reset() {
  gamestate = "play";
  gameover.visible = false;
  cycle.addAnimation("racing", racerimg1);
  pinkgrp.destroyEach();
  yellowgrp.destroyEach();
  redgrp.destroyEach();

  distance = 0;
}