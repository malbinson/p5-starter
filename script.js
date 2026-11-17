//preview: python -m http.server
let img;

async function imgSetup() {
  // Call handleImage() once the image loads.
  img = await loadImage('/assets/bricks.png');

}


function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background(30);
  myBall = new Ball(width / 2, height / 2, 40);
  imgSetup();
}
function draw() {
  background(30);
  myBall.update();   // Calculate physics
  myBall.checkKeys(); // Check for keyboard input
  myBall.display();    // Draw the ball
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.topSpeed = 60;
    this.friction = 0.99; 
  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    let forceMagnitude = 12;
    
    if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
    if (keyIsDown(UP_ARROW))    this.applyForce(createVector(0, -forceMagnitude));
    if (keyIsDown(DOWN_ARROW))  this.applyForce(createVector(0, forceMagnitude));
    if (keyIsDown(32)) { // Space bar to reset position
      console.log("boof!")
    }
  }
  

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.vel.set(force);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.set(0,0);
  }

  display() {
    fill(255, 150, 0);
    noStroke();
    image(img, this.pos.x, this.pos.y, this.r, this.r);
  }
}
