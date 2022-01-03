var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zbimg,zombiegroup
var bullet,bulletImg

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zbimg=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
bulletImg =loadImage("assets/bullet.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombiegroup=new Group ()
bullet=createSprite(displayWidth-1000,displayHeight-300)
bullet.addImage(bulletImg)
bullet.visible=false
bullet.debug=true

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30}
  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+30}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet.visible=true
  player.addImage(shooter_shooting)

 bullet.velocityX=2
 bullet.y=player.y
 bullet.x=player.x+100
 bullet.scale=0.04
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
zombie()
if (zombiegroup.isTouching(bullet)){
for(var i=0;i<zombiegroup.length;i++){
  if(zombiegroup[i].isTouching(bullet)){
    zombiegroup[i].destroy()
   // bullet.destroy()
  }
}
console.log(frameCount)
}

drawSprites();

}
function zombie(){
  if(frameCount% 60===0){
    var zb= createSprite(random(displayWidth-500,displayWidth-50),random(displayHeight-500,displayHeight-300),50,50)
zb.addImage(zbimg)
zb.scale=0.2
zb.velocityX=-10
zb.lifetime=800
zb.debug=true
 zb.setCollider("rectangle",0,0,300,900)
zombiegroup.add(zb)
  }
}