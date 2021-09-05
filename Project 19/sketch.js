var mainRacerImg1,mainRacerImg2, mainRacer;
var path,pathImg;
var cycleBell;
var gameOver, gameOverImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var cashG,diamondsG;

var distance=0;
var gameOver, restart;

function preload(){
    pathImg = loadImage("Road.png");
    mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
    mainRacerImg2= loadAnimation("mainPlayer3.png");
    cycleBell = loadSound("bell.mp3");
    gameOverImg = loadImage("gameOver.png");
    cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");

}

function setup() {
    createCanvas(1200,300);
    // Moving background
    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX = -5;
    
    //creating boy running
    mainCyclist  = createSprite(70,150);
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    mainCyclist.scale=0.07;
      
    //set collider for mainCyclist
    mainCyclist.setCollider("rectangle",0,0, mainCyclist.width-10, mainCyclist.height-10);
    mainCyclist.debug=true;

    gameOver = createSprite(400,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
}

function draw() {
 background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,550,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  createCash();
  createDiamonds();

  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
  treasureCollection = treasureCollection+50;
    
  }
  else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection + 100;
    
  
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    text("Press Up Arrow to Restart the game!",400, 220);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  

    //write condition for calling reset( )
    if (keyDown("UP_ARROW")){
      reset();
    }
}
}


function createCash() {
    if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
    }
  }
  
  function createDiamonds() {
    if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
  }
  

}