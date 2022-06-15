const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
//var
var BackgroundImg,backgroundSprite;
var shooter,motherNave,lightRayGroup;
var shooterImg,shootingAnmtn,
    motherNaveImg,motherNaveDiyingAnmtn,
    motherNave25,motherNave10,lightRayImg,meteorImg;
var isShooting = false;
var song1,song2;
var song1IsPlaying = true;
var spaceVelocity = 1
//grupos
var rocks;
//Valor para pegar o ultimo item do grupo "lightRayGroup"
var index;
function preload() {
  //song
  song1 = loadSound("/assets/songs/Clair_de_Lune.mp3");
  song2 = loadSound("/assets/songs/Sonic_Blaster.mp3");
  //background
    BackgroundImg = loadImage("/assets/Others/space.png");
  //motherNave
    motherNaveImg = loadImage("/assets/NaveMotherImages/motherNave.png");
    motherNaveDiyingAnmtn = loadAnimation("/assets/NaveMotherImages/motherDiying1.png",
                                          "/assets/NaveMotherImages/motherDiying2.png",
                                          "/assets/NaveMotherImages/motherDiying3.png",
                                          "/assets/NaveMotherImages/motherDiying4.png",
                                          "/assets/NaveMotherImages/MotherExplosion.png");
    motherNave25 = loadImage("/assets/NaveMotherImages/motherNave25.png");
    motherNave10 = loadImage("/assets/NaveMotherImages/motherNave10.png");
  //shooter
    shooterImg = loadImage("/assets/ShooterImages/player.png");
    shootingAnmtn = loadAnimation("/assets/ShooterImages/playerShine1.png","/assets/ShooterImages/playerShine2.png",
                                  "/assets/ShooterImages/playerShine3.png","/assets/ShooterImages/playerShine4.png",
                                  "/assets/ShooterImages/playerShine4.png","/assets/ShooterImages/playerShine4.png",
                                  "/assets/ShooterImages/playerShine2.png","/assets/ShooterImages/playerShine1.png");
  //meteor
    meteorImg = loadImage("/assets/Others/meteoro.png");
  //lightRay
    lightRayImg = loadImage("/assets/Others/light.png");
}

function setup() {
  //Config
  engine = Engine.create();
  world = engine.world;
  //Canvas
  createCanvas(600,750);
  //background
  backgroundSprite = createSprite(300,0);
  backgroundSprite.addImage(BackgroundImg);
  backgroundSprite.scale = 1.5;
  //MotherNave
  motherNave = createSprite(300,500,600,300);
  motherNave.addAnimation("normal",motherNaveImg);
  motherNave.scale = 1.5;
  //SHOOTER NAVE
  shooter = createSprite(300,500);
  shooter.addAnimation("normal",shooterImg);
  shooter.addAnimation("shooting",shootingAnmtn);
  shooter.scale = 0.2;
  //Groups
  lightRayGroup = new Group();
  rocks = new Group();
}

function draw() {
  background(0);
  //songLoop
  if (!song1.isPlaying() && song1IsPlaying) {
    song1.play();
  }
  if (!song2.isPlaying() && !song1IsPlaying) {
    song2.play();
    song2.setVolume(0.1);
    song1.setVolume(0);
  }
  if (spaceVelocity >= 20) {
    song1IsPlaying = false;
  }
  //Plano de fundo se mexendo
  backgroundSprite.position.y = backgroundSprite.position.y + spaceVelocity;
  if (backgroundSprite.position.y > 1000) {
    backgroundSprite.position.y = 0;
  }

  //Movimentação do atirador(player)
  if (keyDown(LEFT_ARROW) && !(shooter.position.x < 101)) {
    shooter.position.x = shooter.position.x - 40;
  }
    
  if (keyDown(RIGHT_ARROW) && !(shooter.position.x > 489)) {
    shooter.position.x = shooter.position.x + 40;
  }

  //Mudar a animação se isShooting for verdade, se for falso, volta a animação normal
  if (isShooting) {
    shooter.changeAnimation("shooting");
  }

  if(!isShooting){
    shooter.changeAnimation("normal");
  }
    
    //Se a posição y último item da matriz "lightRayGroup" for menor do que 500, isShooting será falso
  if (index !== undefined) {
    if (lightRayGroup[index].position.y <= 300) {
      isShooting = false;
    }
  }

  createRocks();
  //desenhar os sprites
  drawSprites();
}


function shootRay(){
  //Criar nova variável para laser
  var lightRay = createSprite(shooter.position.x,shooter.position.y,50,10);
  //Configurar imagem
  lightRay.addImage(lightRayImg);
  lightRay.scale = 0.05;
  //Velocidade
  lightRay.velocity.y = -40;
  isShooting = true;
  //Adicionar variável ao grupo  
  lightRayGroup.add(lightRay);
  //Dar a variavel index o valor do tamanho do grupo - 1(ou seja, o ultimo item do grupo)
  index = lightRayGroup.length - 1;
}
  
function keyReleased(){
  //se pressionar espaço, a função shootRay será ativada
  if (keyDown("space")) {
    shootRay();
  }
}
//Create rocks finalizada(obs: apenas o primeiro meteoro é destruído);
//Obs: achei mais conveniente fazer os meteoros por função do que por classe, funciona melhor pra mim
function createRocks() {
  var rockId;
  var angle = spaceVelocity;
  angle += 0.1;
  if (frameCount % 200 === 0) {
    var rock = createSprite(Math.round(random(50,550)),-80,50,50);
    rock.addImage(meteorImg);
    rock.scale = 0.5;
    rocks.add(rock);
  } 
  //Pegar id do meteoro
  for (let index = 0; index < rocks.length; index++) {
    rocks[index].position.y += spaceVelocity;
    rockId = index;
  }
  //Verificar toque do meteoro com laser
  if (rocks[0] !== undefined) {
    if (lightRayGroup.isTouching(rocks)) {
      //Aumentar velocidade do espaço
      spaceVelocity += 1;
      //Destruir meteoro
      rocks.destroyEach();
    }
  }
}