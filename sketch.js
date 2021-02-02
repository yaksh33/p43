var nobita, nobitaImg, scared, scareImg;
var home, homeImg;
var score = 0;
var gr;
var food, foodImg, foodGrp;
var obstacle, obstacleImg, obstaclesGroup;
var play = 1;
var end = 0;
var gameState = play;
var gameOver, gameOverImg;
var restart, resetImg;
var song;
localStorage["HighestScore"] = 0;
var gianImg, motherImg, uncleImg, resetImg;
var scareImg, homeImg, cakeImg, foodImg, pizzaImg;
var school, schoolImg

function preload(){
  nobitaImg = loadImage("Nobita_1.png");
  //gianImg = loadImage("gian.png");
  //motherImg  = loadImage("tamako.jpg");
  //uncleImg = loadImage("Kaminari2.jpg")
  resetImg = loadImage("reset.png");
  gameOverImg = loadImage("game_over_PNG57.png");
  scareImg = loadImage("crynobita.jpg");
  homeImg = loadImage("home1.png");
  schoolImg = loadImage("school.png");
  foodImg = loadImage("doracake.png");
  cakeImg = loadImage("cake.png");
  pizzaImg = loadImage("pizza.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  console.log(width);
  console.log(height);
  home = createSprite(width/2, height/2 ,width,height);
  home.shapeColor = rgb(173, 216, 230);
  home.addImage(homeImg);
  home.scale = 2.2;
  home.velocityX = -10;
  
  
  nobita = createSprite(150,height-50,50,50);
  nobita.addImage(nobitaImg);
  nobita.scale = 0.3;
  
  gr = createSprite(width/2,nobita.y+50,width,10);
  gr.visible = false;
  
  foodGrp = new Group();
  obstaclesGroup = new Group();
  
  scared = createSprite(nobita.x, nobita.y-80,20,20);
  scared.addImage(scareImg);
  scared.scale = 0.5;
  scared.visible = false;
  
  gameOver = createSprite(width/2,height/2,100,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  gameOver.visible = false;
  
  restart = createSprite(width/2,gameOver.y+120,30,20);
  restart.addImage(resetImg);
  restart.scale = 0.4;
  restart.visible = false;
}

function draw(){
background("black");
  
  if (gameState === play){
  if (home.x < 0){
      home.x = home.width/2+400;
    }
  
  if(keyDown("space") && nobita.y >= height/2+80) {
      nobita.velocityY = -12;
    }
    nobita.velocityY = nobita.velocityY + 0.8
  nobita.collide(gr);
  
  if(nobita.isTouching(foodGrp)){
  score = score+2;
    foodGrp.destroyEach();
  }
  
  spawnFoods();
  spawnObstacles();
    
    if (nobita.isTouching(obstaclesGroup)){
    gameState = end;
    }
  }
  else if (gameState === end) {
    scared.visible = true;
    restart.visible = true;
    gameOver.visible = true;
    nobita.visible = false;
    
    //set velcity of each game object to 0
    home.velocityX = 0;
    nobita.velocityY = 0;
    foodGrp.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    text("Your Score is: ",score,width/2, height/2+150);
   
    obstaclesGroup.setLifetimeEach(-1);
    foodGrp.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
  
  fill(0);
  textSize(20);
  stroke(0);
  text("Score: "+ score, 450,50);
  text(localStorage["HighestScore"],300,50)
  text("High Score: ",190,50) 
}

function spawnFoods() {
  //write code here to spawn the foods
  if (frameCount % 200 === 0) {
    food = createSprite(width+10,Math.round(random(gr.y-400,gr.y-150)),40,10);
    food.velocityX = -10;
    food.scale = 0.3;
    var ran = Math.round(random(1,3));
    switch(ran){
      case 1: food.addImage(foodImg);
      break;
      case 2: food.addImage(cakeImg);
      break;
      case 3: food.addImage(pizzaImg);
      break;
      default : break;
    }
    
     //assign lifetime to the variable
    food.lifetime = 200;
    foodGrp.add(food);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(width+10,gr.y-80,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    /*var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(gianImg);
              break;
      case 2: obstacle.addImage(motherImg);
              break;
      case 3: obstacle.addImage(uncleImg);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  scared.visible = false;
  nobita.visible = true;
  
  foodGrp.destroyEach();
  obstaclesGroup.destroyEach();
  
  home.velocityX = -7;
   if (home.x < 0){
      home.x = home.width/2;
    }
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}