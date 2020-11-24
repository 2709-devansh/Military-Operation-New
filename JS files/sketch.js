const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var gameState = "play";
var fighterPlane, fighterPlaneIMG;
var enemyImg;
var bgImg, BackGround;
var building, building1, building2, building3, building4, building5, building;
var rand;
var bomb, bombImg, explosionImg;
var bombGroup, buildingsGroup, bulletGroup, planeGroup;
var bulletImg;
var enemieskilled = 0;
var buildingsdestroyed = 0;
var bulletSound, bombSound, explosionSound, bullet2;

function preload(){
  fighterPlaneIMG = loadImage("Images/Fighter Planes/Fighter.png");
  bgImg = loadImage("Images/bg.jpg");
  building1 = loadImage("Images/Buildings/Storage.png");
  building2 = loadImage("Images/Buildings/School.png");
  building3 = loadImage("Images/Buildings/House.png");
  building4 = loadImage("Images/Buildings/Construct.png");
  bombImg = loadImage("Images/bomb.png");
  enemyImg = loadImage("Images/Fighter Planes/Enemy.png");
  explosionImg = loadImage("Images/Buildings/Explosion.png");
  bulletImg = loadImage("Images/bullet.jpg")
  bulletSound = loadSound("Sounds/gunshot.mp3");
  bombSound = loadSound("Sounds/bombdrop.mp3");
  explosionSound = loadSound("Sounds/explosion.mp3");
}

function setup() {
  createCanvas(1350,670);
  engine = Engine.create();
  world = engine.world;

  BackGround = createSprite(675,335,20,20);
  BackGround.addImage(bgImg);
  BackGround.x =  BackGround.width/2;
  BackGround.velocityX = -10;
  BackGround.scale = 5;

  fighterPlane = createSprite(100, 60, 50, 50);
  fighterPlane.shapeColor = "#267c21";
  fighterPlane.addImage(fighterPlaneIMG);
  fighterPlane.scale = 0.5;

  bombGroup = new Group();
  buildingsGroup = new Group();
  fighterbulletGroup = new Group();
  enemybulletGroup = new Group();
  planeGroup = new Group();
}

function draw() {
  background("white"); 
  edges = createEdgeSprites();
  Engine.update(engine);

 if(gameState === "play"){
  if(BackGround.x < 0){
    BackGround.x = BackGround.width;
  }

  if(keyDown("DOWN_ARROW")){
    fighterPlane.y = fighterPlane.y + 15;
  }
  if(keyDown("UP_ARROW")){
    fighterPlane.y = fighterPlane.y - 10;
  }

  fighterPlane.collide(edges[3]);
  fighterPlane.collide(edges[2]);

  if(keyWentDown("space")){
    createBomb();
    bombSound.play();
  }
  if(keyWentDown("B")){
    createBullet();
    bulletSound.play();
  }

  if(bombGroup.isTouching(building)){
    buildingsGroup.destroyEach();
    buildingsdestroyed++;
    explosionSound.play();
  } 
 
  if(fighterbulletGroup.isTouching(planeGroup)){
    planeGroup.destroyEach();
    enemieskilled++;
    explosionSound.play();
  } 

  if(buildingsGroup.isTouching(fighterPlane) || enemybulletGroup.isTouching(fighterPlane)){
    fighterPlane.destroy();
    explosionSound.play();
    gameState = "end";
  }

  spawnEnemies();
  spawnBuildings();
 }

 if(gameState === "end"){
  BackGround.velocityX = 0;
  buildingsGroup.setVelocityXEach(0);
  buildingsGroup.setLifetimeEach(-1);
  planeGroup.setVelocityXEach(0);
  fighterbulletGroup.setVelocityXEach(0);
  enemybulletGroup.setVelocityXEach(0);
  fighterbulletGroup.setLifetimeEach(-1);
  enemybulletGroup.setLifetimeEach(-1);
  planeGroup.setLifetimeEach(-1);
 }

 drawSprites();

 if(gameState === "end"){
  textSize(100);
  fill(0, 255, 221);
  text("GAME OVER", 350, 310);
 }

 textSize(20);
 fill("white");
 text("Buildings Destroyed: " + buildingsdestroyed, 200, 30);
 text("Enemies Killed: " + enemieskilled, 900, 30);
}

function spawnBuildings(){
  if(frameCount%120 === 0){
    building = createSprite(1350, 600, 40, 40);
    building.velocityX = -10;
    var rand = Math.round(random(1, 4));
    console.log(rand);
    switch(rand){
      case 1: building.addImage(building1);
      break;
      case 2: building.addImage(building2);
      break;
      case 3: building.addImage(building3);
      break;
      case 4: building.addImage(building4);
      break;
      default : break;
    }
    building.lifetime = 150;
    buildingsGroup.add(building); 
  }
}