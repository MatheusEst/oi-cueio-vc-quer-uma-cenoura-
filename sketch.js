const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var quebrou = 0

var engine;
var world;
var tomeu,coto,titi,bgsound,ventu
var solo,cueieo,cueioimg,chorando,nhamnham,meloi,melon,balon,mutapls
var bg
var mute,botao,botao2,botao3
var corda
var linke

var corda2
var linke2
var corda3
var linke3
function preload(){

  bg = loadImage("background.png");
  meloi = loadImage("melon.png");
  cueioimg = loadAnimation("fofo1.png","fofo2.png","fofo3.png");
  chorando = loadAnimation("sad_3.png");
  nhamnham = loadAnimation("comendo1.png","comendo2.png","comendo3.png");
  nhamnham.looping = false
  coto = loadSound("helo.mp3");
  tomeu = loadSound("eating_sound.mp3");
    bgsound = loadSound("sound1.mp3");
    titi = loadSound("sad.wav");
  ventu = loadSound("air.wav");
}

function setup() 
{
  createCanvas(1000,600);
  engine = Engine.create();
  world = engine.world;
 
  var anchored = {
    isStatic:true
  }
  corda = new Rope(5,{x:300,y:50});
  corda2 = new Rope(5,{x:400,y:200});
  corda3 = new Rope(5,{x:150,y:60});
  
  solo = Bodies.rectangle(500,700,3000,5,anchored);
  World.add(world,solo);
  cueio = createSprite(200,450);
  cueio.scale = 0.2;
  cueio.addAnimation("pisca",cueioimg)
  cueio.addAnimation("tomeno",nhamnham)
  cueio.addAnimation("chorano",chorando)
  cueio.frameDelay = 12
  //Bodies.rectangle(200,500,150,150);
  World.add(world,cueio);
  melon = Bodies.rectangle(50,100,75,75);
  Matter.Composite.add(corda.body,melon)
 botao = createImg("botao.png")
  botao.position(corda.body.bodies[0].position.x-50,corda.body.bodies[0].position.y);
  botao.size(30,30)
  botao2 = createImg("botao.png")
  botao2.position(400 + 35,200);
  botao2.size(30,30)
  botao3 = createImg("botao.png")
  botao3.position(150 + 35,60);
  botao3.size(30,30)
  balon = createImg("balloon.png")
  balon.position(910,300);
  balon.size(100,80)
  mutapls = createImg("mute.png")
  mutapls.position(500,65);
  mutapls.size(50,50)
  linke = new link(corda,melon)
  linke2 = new link(corda2,melon)
  linke3 = new link(corda3,melon)
  bgsound.play();
  bgsound.setVolume(0.2);
botao.mouseClicked(quebrar);
balon.mouseClicked(ventin);
botao2.mouseClicked(quebrar1);
botao3.mouseClicked(quebrar2);
mutapls.mouseClicked(mutar);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}
function quebrar(){
  quebrou += 1
  corda.break();
  linke.remove()
}
function quebrar1(){
  quebrou += 1
  corda2.break();
  linke2.remove()
}
function quebrar2(){
  quebrou += 1
  corda3.break();
  linke3.remove()
}
function colis2(corp,spri){
if(quebrou == 3){
if(corp != null){
    var distancia = dist(corp.position.x,corp.position.y,spri.position.x,spri.position.y)
    console.log(distancia + "do solo")
    if(distancia <=535){

    World.remove(engine.world,melon);
    melon = null
    //cueio.changeAnimation("tomeno");
    //cueio.frameDelay = 10;
      return true
  }else{
    return false
  }
}
  
}
}
function ventin(){
  if(!ventu.isPlaying()){
    ventu.play();
    Matter.Body.applyForce(melon,{x:0,y:0},{x:-0.2,y:0});
  }
  

}
function mutar(){
  if(bgsound.isPlaying()){
    bgsound.stop()
  }else{
    bgsound.play()
  }
}
function colis(corp,spri){
  if(quebrou == 3){
    if(corp != null){
    var distancia = dist(corp.position.x,corp.position.y,spri.position.x,spri.position.y)
    console.log(distancia + "  Coelho ")
    if(distancia <= 150){

    World.remove(engine.world,melon);
    melon = null
    //cueio.changeAnimation("tomeno");
    //cueio.frameDelay = 10;
      return true
  }else{
    return false
  }
  }
  
}
}
function draw() 
{
  rectMode(CENTER)
  background(bg)
  Engine.update(engine);
  drawSprites(); 
  imageMode(CENTER)
  rect(solo.position.x,700,3000,5)
  //image(cueioimg,cueio.position.x,cueio.position.y,150,150)
  if(melon != null){
  image(meloi,melon.position.x,melon.position.y,75,75);
  }
  
  if(colis(melon,cueio)== true){
    cueio.changeAnimation("tomeno");
    cueio.frameDelay = 10;
    tomeu.play();
    tomeu.looping = false;
  }
  if(colis2(melon,solo) == true){
    cueio.changeAnimation("chorano");
    cueio.frameDelay = 8
    titi.play()
    titi.looping = false
  }
  corda.show()
  corda2.show()
  corda3.show()
}




