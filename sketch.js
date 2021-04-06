var player1,player1Style1,player1Style2,player1Img;
var player2,player2Style1,player2Style2,player2Img;
var invisibleGround1,invisibleGround2;
var bullet1Group,bullet1;
var bullet2Group,bullet2;
var bullet1Img;
var bullet2Img;
var obstacleGroup;
var obstacle,obstacleImg; 
var restart,restarImg;
var restart2,restar2Img;
var bg,bgImg;
var player1Text,player1TextImg;
var player2Text,player2TextImg;
var black;
var END1 = 0
var END2 = 1
var START = 2
var PLAY = 3
var gameState = START
var edges 

function preload(){
bgImg = loadImage("Images/bg.jpg")  

bullet2Img = loadImage("Images/bullet2.png")

bullet1Img = loadImage("Images/bullet1.png")

obstacleImg = loadImage ("Images/obstacle.png")

player1TextImg = loadImage("Images/player1Text.png")
player2TextImg = loadImage("Images/player2Text.png")

restartImg = loadImage("Images/restart.png")

restart2Img = loadImage("Images/restart.png")

player1Img = loadAnimation ("Images/fighter2.10.png")
player1Style1 = loadAnimation ("Images/fighter2.1.png","Images/fighter2.2.png","Images/fighter2.3.png","Images/fighter2.4.png","Images/fighter2.5.png","Images/fighter2.6.png","Images/fighter2.7.png","Images/fighter2.8.png","Images/fighter2.9.png","Images/fighter2.10.png")
player1Style2 = loadAnimation ("Images/fighter2.6.png");

player2Img = loadAnimation ("Images/fighter4.png");
player2Style1 = loadAnimation ("Images/fighter1.png","Images/fighter2.png","Images/fighter3.png","Images/fighter4.png","Images/fighter5.png","Images/fighter6.png","Images/fighter7.png")
player2Style2 = loadAnimation ("Images/fighter1.png")
}

function setup() {
 createCanvas(1200,700); 

 player1Text = createSprite(600,200,10,10)
 player1Text.addImage(player1TextImg)
 player1Text.visible=false

 player2Text = createSprite(600,200,10,10)
 player2Text.addImage(player2TextImg)
 player2Text.visible=false

 invisibleGround1 = createSprite(650,697,1350,10)
 invisibleGround1.shapeColor="red"

 invisibleGround2 = createSprite(600,5,1350,10)
 invisibleGround2.shapeColor="red"

  player1 = createSprite(250,540,30,30)
  player1.addAnimation ("standing",player1Img)
  player1.addAnimation ("fighting1",player1Style1)
  player1.addAnimation ("fighting2",player1Style2)
  player1.setCollider("rectangle",0,0,50,65)
  player1.scale = 2.5
 // player1.debug = true
  
  player2 = createSprite(950,550,30,30)
  player2.addAnimation("still",player2Img)
  player2.addAnimation("fighting3",player2Style1)
  player2.addAnimation("fighting4",player2Style2)
  player2.setCollider("rectangle",0,0,50,65)
  player2.scale=2.5
 // player2.debug = true

  restart = createSprite (600,350,10,10)
  restart.addImage(restartImg)     
  restart.visible = false   
  restart.scale = 0.5
  
  restart2 = createSprite (600,350,10,10)
  restart2.addImage(restart2Img)     
  restart2.visible = false   
  restart2.scale = 0.5

  bullet1Group = createGroup();
  bullet2Group = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  background("black")

  if(gameState===START){ 
 // black = createSprite(1200,700,100,10) 
  fill("blue")   
  textSize(50)   
  text("Player1",200,100)
  text("press A for up",100,200)
  text("press D for down",100,300)
  text("press W for shoot",100,400)
  textSize(50)
  fill("red")
  text("Player2",800,100)
  text("press down arrow for down",600,200)
  text("press up arrow for up",650,300)
  text("press <= for shoot",720,400)
  textSize(50)
  fill("yellow")
  text("Aim is to defeat the enemy by the hitting the bullet",35,500)
  text("Press space to continue",300,600)
  if(keyDown("space")){
  gameState = PLAY
   }

}
  if(gameState===PLAY){
    background(bgImg) 
  
    drawSprites() 

    if(keyDown(LEFT_ARROW)){
    releaseBullet2()
    player2.changeAnimation("fighting4",player2Style1) 
    }

  if(keyIsDown(UP_ARROW)){
    player2.y-=3
    player2.changeAnimation("fighting3",player2Style2) 
  }

  if(keyDown(DOWN_ARROW)){
    player2.y+=3
    player2.changeAnimation("fighting3",player2Style2)
  }

  if(keyDown("A")){
    player1.y-=3
    player1.changeAnimation("fighting1",player1Style1) 
  }

  if(keyDown("D")){
    player1.y+=3
    player1.changeAnimation("fighting1",player1Style1) 
  }

  if(keyDown("w")){
    releaseBullet1()
    player1.changeAnimation("fighting2",player1Style2) 
  }

  if(frameCount % 120 === 0){
    var obstacle = createSprite(600,10,40,10);
    obstacle.addImage(obstacleImg)
    //obstacle.debug=true
   // obstacle.x = Math.round(random(850,851));
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.5;
    obstacle.velocityY = 4;
  }
  if(bullet1Group.isTouching(bullet2Group)){
    bullet1Group.destroyEach()
    bullet2Group.destroyEach()
  }

  if(bullet1Group.isTouching(obstacleGroup)){
     bullet1Group.destroyEach()
     obstacleGroup.destroyEach() 
  }
   
  if(bullet2Group.isTouching(obstacleGroup)){
    bullet2Group.destroyEach()
    obstacleGroup.destroyEach() 
 }
  
  if(bullet1Group.isTouching(player2)){
    bullet1Group.destroyEach()
    bullet2Group.destroyEach()
    obstacleGroup.destroyEach()
    gameState = END1  
  }

  if(bullet2Group.isTouching(player1)){
    bullet1Group.destroyEach()
    bullet2Group.destroyEach()
    gameState = END2 
  }

  if(player1.isTouching(invisibleGround1)){
    gameState= END2
  }

  if(player1.isTouching(invisibleGround2)){
    gameState= END2
  }

  if(player2.isTouching(invisibleGround1)){
    gameState= END1
  }

  if(player2.isTouching(invisibleGround2)){
    gameState= END1
  }

  player2Text.visible=false
  player1Text.visible=false
  restart.visible=false
  restart2.visible=false
  player1.visible=true
  player2.visible=true

}
 
  if(gameState===END1){
    drawSprites()
    player1Text.visible=true
    restart2.visible = true
    player1.visible=false
    player2.visible=false
    obstacleGroup.destroyEach()
    bullet1Group.destroyEach()
    bullet2Group.destroyEach()
    if(mousePressedOver(restart2)){
     reset ()
    }
  }

  if(gameState===END2){
    drawSprites()
    player2Text.visible=true
    restart.visible = true
    player1.visible=false
    player2.visible=false
    obstacleGroup.destroyEach()
    bullet1Group.destroyEach()
    bullet2Group.destroyEach()
    if(mousePressedOver(restart2)){
      gameState = START
      reset()
    }
  }

}

function releaseBullet2(){
  bullet2 = createSprite(50,250,50,10)  
  bullet2.addImage(bullet2Img) 
  bullet2.y=player2.y
  bullet2.x=player2.x  
  bullet2.scale=0.50
  bullet2.velocityX=-5
  bullet2.lifetime=400
  bullet2Group.add(bullet2)
  }

  function releaseBullet1(){
    bullet1 = createSprite(50,250,50,10)  
    bullet1.addImage(bullet1Img) 
    bullet1.y=player1.y
    bullet1.x=player1.x  
    bullet1.scale=0.80
    bullet1.velocityX=5
    bullet1.lifetime=400
    bullet1Group.add(bullet1)     
    }

    function reset(){
      gameState = START
    }