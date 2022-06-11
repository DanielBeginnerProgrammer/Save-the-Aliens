class Rock {
    constructor(x, y, gravity) {
      var options = {
        frictionAir : gravity
      };
      this.r = 50
      this.body = Bodies.circle(x, y, this.r, options);
      this.image = loadImage("./assets/Others/meteoro.png");
      this.image = [this.image];
      this.trajectory = [];
      World.add(world, this.body);
    }
  
    display() {
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      imageMode(CENTER);
      image(this.image, 0, 0, this.r, this.r);
      pop();

    }
  }
  
  