//Global Variables

var monkey, monkeyAnimation;
var bananaImage;
var jungle, jungleImage;
var stoneImage;
var gameOver, gameOverImage;
var restart, restartImage;
var invisibleGround;
var foodGroup, obstacleGroup;
var score


function preload(){
  
  monkeyAnimation = loadAnimation("Images/Monkey_01.png", "Images/Monkey_02.png", 
  "Images/Monkey_03.png", "Images/Monkey_04.png", "Images/Monkey_05.png", 
  "Images/Monkey_06.png", "Images/Monkey_07.png", "Images/Monkey_08.png", "Images/Monkey_09.png", 
  "Images/Monkey_10.png");
  
  bananaImage = loadImage("Images/Banana.jpeg");
  
  jungleImage = loadImage("Images/jungle.png");
  
  stoneImage = loadImage("Images/stone.png");
}


function setup() {
  createCanvas(600,300);
  
  
  jungle = createSprite(800, 50, 800, 10);
  jungle.addImage(jungleImage);
  jungle.scale = 3
  jungle.x = jungle.width/2;
  
  monkey = createSprite(50, 240, 20, 20);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(300, 295, 600, 10);
  invisibleGround.visible = false;
  
  score = 0;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  textSize(20);
}


function draw(){
  background(255);
  
  if(keyDown("space")){
   monkey.velocityY = -10; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.6
  
  monkey.collide(invisibleGround);  
  
  jungle.velocityX = -4;
  
  if(jungle.x < 0){
  jungle.x = jungle.width/2;
  }
  
  spawnBanana();
  spawnStone();
  
  if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score = score + 2 
  }
  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    monkey.scale = 0.1;
    score = score - 2
  }
  
  if(score === -2){
    score = 0
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break
      case 20: monkey.scale = 0.14;
      break
      case 30: monkey.scale = 0.16;
      break
      case 40: monkey.scale = 0.18;
      default: break
  }
  
  drawSprites();
  text("Score: " + score, 500, 50);
}

function spawnBanana(){
 if(frameCount % 200 === 0){
   var banana = createSprite(600, Math.round(random(10, 185)), 10, 10);
   banana.velocityX = -4
   banana.addImage(bananaImage);
   banana.scale = 0.05
   foodGroup.add(banana);
 }
}

function spawnStone(){
  if(frameCount % 125 === 0){
    var stone = createSprite(600, 265, 20, 20);
    stone.addImage(stoneImage);
    stone.velocityX = -4
    stone.scale = 0.2
    obstacleGroup.add(stone);
  }
}
