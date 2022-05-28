const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d'); // our canvas is 2d

canvas.width = innerWidth; // to make the canvas take up the entire width of the page

canvas.height = innerHeight;// to make the canvas take up the entire height of the page

class Boundary {
  static width = 35;

  static height = 30;

  constructor({ position }) {
    this.position = position;
    this.width =35;
    this.height = 30;
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
class Pellet {
  constructor({ position}) {
    this.position = position;
    this.radius = 4;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'grey';
    c.fill();
    c.closePath();
  }

}

class Ghost {
  constructor({ position, velocity, target }) {
    this.position = position;
    this.velocity = velocity;
    this.target = target;
    this.radius = 10;
    this.stepSpeed =5;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'red';
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    // if (Math.hypot(((this.position.x + this.position.velocity.x) - this.target.position.x ),((this.position.y) - this.target.position.y)))

    if (this.position.x > this.target.position.x) 
    {
     let stepInX = (Math.hypot(((this.position.x - this.stepSpeed) - this.target.position.x ),((this.position.y) - this.target.position.y))) 
     let stepInY = (Math.hypot(((this.position.x) - this.target.position.x ),((this.position.y - this.stepSpeed) - this.target.position.y))) 
    
    if (stepInX<stepInY){
      this.velocity.x = 5;
      this.velocity.y = 0;
    }
    else{
      this.velocity.x = 0;
      this.velocity.y = 5;
    }
  }

  else  {
    let stepInX = (Math.hypot(((this.position.x + this.stepSpeed) - this.target.position.x ),((this.position.y) - this.target.position.y))) 
    let stepInY = (Math.hypot(((this.position.x) - this.target.position.x ),((this.position.y + this.stepSpeed) - this.target.position.y))) 
   
   if (stepInX<stepInY){
     this.velocity.x = 5;
     this.velocity.y = 0;
   }
   else{
     this.velocity.x = 0;
     this.velocity.y = 5;
   }
 }


    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 10;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'yellow';
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
const map = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '.', '-', '.', '.', '.', '-', '-', '-', '-', '.', '.', '.', '-', '.', '.', '-'],
  ['-', '.', '.', '.', '-', '.', '.', '-', '-', '.', '.', '-', '.', '.', '.', '.', '-'],
  ['-', '-', '-', '.', '-', '-', '.', '[', ']', '.', '-', '-', '.', '.', '-', '-', '-'],
  ['-', '.', '-', '.', '-', '^', '.', '.', '.', '.', '.', '-', '.', '.', '-', '.', '-'],
  ['-', '-', '-', '.', '[', '+', '-', '-', '-', '-', '.', '.', '.', '.', '-', '-', '-'],
  ['-', '.', '.', '.', '.', '_', '-', '.', '.', '-', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '.', '[', ']', '.', '.', '-', '.', '.', '-', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '.', '.', '.', '.', '^', '-', '-', '-', '-', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '-', '-', '.', '[', '5', ']', '.', 'b', '.', '.', '.', '.', '.', '-', '-', '-'],
  ['-', '.', '.', '.', '.', '^', '-', '-', '-', '-', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '.', '.', '.', '[', '+', '.', '-', '-', '.', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '-', '-', '.', '-', '_', '.', '.', '.', '.', '.', '-', '.', '.', '-', '-', '-'],
  ['-', '.', '-', '.', '-', '-', '.', '.', '.', '.', '-', '-', '.', '.', '-', '.', '-'],
  ['-', '-', '-', '.', '-', '.', '.', '[', ']', '.', '.', '-', '.', '.', '-', '-', '-'],
  ['-', '.', '.', '.', '.', '.', '.', '-', '-', '.', '.', '.', '.', '.', '.', '.', '-'],
  ['-', '.', '-', '.', '.', '.', '-', '-', '-', '-', '.', '.', '.', '-', '.', '.', '-'],
  ['-', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '.', '.', '.', '.', '.', '.', '-'],

  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],

];


const boundaries = [];
const pellets = [];
const player = new Player({
  position: {
    x: Boundary.width * 1.5,
    y: Boundary.height *1.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
const ghost = new Ghost({
  position:{
    x: 35 * Boundary.width + Boundary.width/2,
    y: 30 * Boundary.height + Boundary.height/2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  target:{
    x: player.position.x,
    y: player.position.y,
  }

});
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
let lastkey = '';
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          }),
        );
        break;
        case '.':
          pellets.push(
            new Pellet({
              position: {
                x: j * Boundary.width + Boundary.height/2   ,
                y: i * Boundary.height + Boundary.height/2  ,
              },
            }),
          );
          break; 
      

      default: {
        break;
      }
    }
  });
});
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // player.velocity.x = 0;
  // player.velocity.y = 0;

  if (keys.w.pressed && lastkey === 'w') {
    player.velocity.y = -4;
    player.velocity.x = 0;
  } else if (keys.a.pressed && lastkey === 'a') {
    player.velocity.x = -4;
    player.velocity.y = 0;
  } else if (keys.s.pressed && lastkey === 's') {
    player.velocity.y = 4;
    player.velocity.x = 0;
  } else if (keys.d.pressed && lastkey === 'd') {
    player.velocity.x = 4;
    player.velocity.y = 0;
  }
// This part avoids collision with the wall
// This part reders pellets
for (let i=pellets.length - 1; i > 0; i--){
  const pellet = pellets[i];
  pellet.draw();

  if (Math.hypot((pellet.position.x - player.position.x), (pellet.position.y - player.position.y)) < pellet.radius + player.radius)
  {
    console.log('I removed a pellet')
    console.log(pellets.length)
    pellets.splice(i, 1);
    
  }
};
  boundaries.forEach((boundary) => {
    boundary.draw();
    if (player.position.y - player.radius + player.velocity.y <= boundary.position.y + boundary.height
       && player.radius + player.position.x + player.velocity.x >= boundary.position.x
       && player.position.y + player.radius + player.velocity.y >= boundary.position.y
       && player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary.width) {
      // console.log('We are colliding');
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });
  player.update();
  ghost.update();
  

}


animate();

window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastkey = 'w';
      break;

    case 'a':
      keys.a.pressed = true;
      lastkey = 'a';
      break;

    case 's':
      keys.s.pressed = true;
      lastkey = 's';
      break;

    case 'd':
      keys.d.pressed = true;
      lastkey = 'd';
      break;
  }
});
window.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;

      break;

    case 'a':
      keys.a.pressed = false;

      break;

    case 's':
      keys.s.pressed = false;

      break;

    case 'd':
      keys.d.pressed = false;

      break;
  }
  console.log(player.velocity);
});