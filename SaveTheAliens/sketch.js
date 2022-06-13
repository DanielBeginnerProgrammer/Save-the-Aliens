
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
//var
var BackgroundImg,backgroundSprite;
var shooter,motherNave,lightRayGroup;
var shooterImg,shootingAnmtn,
    motherNaveImg,motherNaveDiyingAnmtn,
    motherNave25,motherNave10,lightRayImg,meteorImg;
    let engine;
    let world;
var isShooting = false;
var song1,song2;
var song1IsPlaying = true;
var spaceVelocity = 1
//const

//Valor para pegar o ultimo item do grupo "lightRayGroup"
var index;
function preload() {
  //song
  song1 = loadSound("/Assets/songs/Clair_de_Lune.mp3");
  song2 = loadSound("/Assets/songs/Sonic_Blaster.mp3");
  //background
    BackgroundImg = loadImage("/Assets/Others/space.png");
  //motherNave
    motherNaveImg = loadImage("/Assets/NaveMotherImages/motherNave.png");
    motherNaveDiyingAnmtn = loadAnimation("/Assets/NaveMotherImages/motherDiying1.png",
                                          "/Assets/NaveMotherImages/motherDiying2.png",
                                          "/Assets/NaveMotherImages/motherDiying3.png",
                                          "/Assets/NaveMotherImages/motherDiying4.png",
                                          "/Assets/NaveMotherImages/MotherExplosion.png");
    motherNave25 = loadImage("/Assets/NaveMotherImages/motherNave25.png");
    motherNave10 = loadImage("/Assets/NaveMotherImages/motherNave10.png");
  //shooter
    shooterImg = loadImage("/Assets/ShooterImages/player.png");
    shootingAnmtn = loadAnimation("/Assets/ShooterImages/playerShine1.png","/assets/ShooterImages/playerShine2.png",
                                  "/Assets/ShooterImages/playerShine3.png","/assets/ShooterImages/playerShine4.png",
                                  "/Assets/ShooterImages/playerShine4.png","/assets/ShooterImages/playerShine4.png",
                                  "/Assets/ShooterImages/playerShine2.png","/assets/ShooterImages/playerShine1.png");
  //meteor
    meteorImg = loadImage("/Assets/Others/meteoro.png");
  //lightRay
    lightRayImg = loadImage("/Assets/Others/light.png");
}

function setup() {
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
}

function draw() {
  background(0);

  //song.play();
  spaceVelocity += 0.01
  //songLoop
  if (!song1.isPlaying() && song1IsPlaying) {
    song1.play();
  }
  if (!song2.isPlaying() && !song1IsPlaying) {
    song2.play();
    song2.setVolume(0.1)
    song1.setVolume(0);
  }
  if (spaceVelocity >= 5) {
    song1IsPlaying = false;
  }
  //Plano de fundo se mexendo
  backgroundSprite.position.y = backgroundSprite.position.y + spaceVelocity
    if (backgroundSprite.position.y > 1000) {
        backgroundSprite.position.y = 0;
    }

  //Movimentação do atirador(player)
    if (keyDown(LEFT_ARROW) && !(shooter.position.x < 71)) {
        shooter.position.x = shooter.position.x - 5;
    }
    if (keyDown(RIGHT_ARROW) && !(shooter.position.x > 529)) {
        shooter.position.x = shooter.position.x + 5;
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

    createInfiniteRocks();
  //desenhar os sprites
  drawSprites();
}


  function shootRay(){
    //Criar nova variável para laser
    var lightRay = createSprite(shooter.position.x,shooter.position.y);
    //Configurar imagem
    lightRay.addImage(lightRayImg);
    lightRay.scale = 0.05;
    //Velocidade
    lightRay.velocity.y = -20;
    isShooting = true;
    //Adicionar variável ao grupo  
    lightRayGroup.add(lightRay);
    //Dar a variavel index o valor do tamanho do grupo - 1(ou seja, o ultimo item do grupo)
    index = lightRayGroup.length - 1;
  }

  function createInfiniteRocks() {
    if (frameCount % 60 === 0) {
      createNewRock(Math.random(200,400),700,20);

    }
  }

  function keyReleased(){
          //se pressionar espaço, a função shootRay será ativada
          if (keyDown("space")) {
              shootRay();
          }
  }

    function createNewRock(x,y,g) {
      var rock;
      rock = new Rock(x,y,g);
            rock.display()
    }
