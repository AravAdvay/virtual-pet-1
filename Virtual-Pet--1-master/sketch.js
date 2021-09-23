var dog,happyDog,dogImg,happyDogImg,database,foodS,foodStock

function preload()
{
  dogImg=loadImage("images/dogImg.png")
  happydogImg=loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(250,350,10,60);
  dog.scale=0.2
  dog.addImage(dogImg)
foodStock=database.ref('Food');
foodStock.on("value",readStock);
foodStock.set(20)
  
}


function draw() {  
 background("green")

 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(happydogImg);
 }

 if(keyWentUp(UP_ARROW)){
   dog.addImage(dogImg);
 }
 
  drawSprites();
  //add styles here
textSize(20);
fill(255)
text("Press up arrow to feed the dog" ,50,50)
text("Food remaning : " +foodS,150,150)

}

function readStock(data) {
  foodS=data.val()
} 

function writeStock(x){

  if (x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}


