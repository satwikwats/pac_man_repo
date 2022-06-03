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
    this.stepSpeed =1;
    this.wallUp = false;
    this.wallDown = false;
    this.wallLeft = false;
    this.wallRight = false;
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

    if (this.position.x > this.target.x) 
    {
     let stepInX = (Math.hypot(((this.position.x - this.stepSpeed) - this.target.x ),((this.position.y) - this.target.y))) 
     let stepInY = (Math.hypot(((this.position.x) - this.target.x ),((this.position.y - this.stepSpeed) - this.target.y))) 
    
    if (stepInX<stepInY){
      this.velocity.x = -this.stepSpeed;
      this.velocity.y = 0;
    }
    else{
      this.velocity.x = 0;
      this.velocity.y = -this.stepSpeed;
    }
  }

  else  {
    let stepInX = (Math.hypot(((this.position.x + this.stepSpeed) - this.target.x ),((this.position.y) - this.target.y))) 
    let stepInY = (Math.hypot(((this.position.x) - this.target.x ),((this.position.y + this.stepSpeed) - this.target.y))) 
   
   if ((stepInX<stepInY) && ! (this.wallLeft || this.wallRight) ){
     this.velocity.x = this.stepSpeed;
     this.velocity.y = 0;
   }
   else{
     this.velocity.x = 0;
     this.velocity.y = this.stepSpeed;



   }
 }

//  if(this.wallUp || this.wallDown)
//  {
//    this.velocity.y=0
//  }

//  if(this.wallLeft || this.wallRight)
//  {
//    this.velocity.x=0;
//  }


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
    x: 16 * Boundary.width - Boundary.width/2,
    y: 20 * Boundary.height - Boundary.height/2,
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
 

  if (keys.w.pressed && lastkey === 'w') {
    boundaries.forEach((boundary) => {
    if (collisionHappening({
      char: {...player,
      velocity:{
        x:0,
        y:-5,
      }
      } ,
      block: boundary,
    })) 
    {
      player.velocity.y = 0;
    }

    else
    player.velocity.y = -5;
  })
}
    
    else if (keys.a.pressed && lastkey === 'a') {
      boundaries.forEach((boundary) => {
        if (collisionHappening({
          char: {...player,
          velocity:{
            x:-5,
            y:0,
          }
          } ,
          block: boundary,
        })) 
        {
          player.velocity.x = 0;
        }
    
        else
        player.velocity.x = -5;
      }) 
  } else if (keys.s.pressed && lastkey === 's') {
    boundaries.forEach((boundary) => {
      if (collisionHappening({
        char: {...player,
        velocity:{
          x:0,
          y:5,
        }
        } ,
        block: boundary,
      })) 
      {
        player.velocity.y = 0;
      }
  
      else
      player.velocity.y = 5;
    })
  } else if (keys.d.pressed && lastkey === 'd') {
    boundaries.forEach((boundary) => {
      if (collisionHappening({
        char: {...player,
        velocity:{
          x:5,
          y:0,
        }
        } ,
        block: boundary,
      })) 
      {
        player.velocity.x = 0;
      }
  
      else
      player.velocity.x = 5;
    })
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

function collisionHappening({char, block})
{
  return((char.position.y - char.radius + char.velocity.y <= block.position.y + block.height
    && char.radius + char.position.x + char.velocity.x >= block.position.x
    && char.position.y + char.radius + char.velocity.y >= block.position.y
    && char.position.x - char.radius + char.velocity.x <= block.position.x + block.width) )
}

  boundaries.forEach((boundary) => {
    boundary.draw();

    if (collisionHappening({
      char: player ,
      block: boundary,
    })) 
    {
      // console.log('We are colliding');
      player.velocity.x = 0;
      player.velocity.y = 0;
    }

  });
  player.update();
  player.velocity.x = 0;
  player.velocity.y = 0;

  
  ghost.target.x= player.position.x;
  ghost.target.y= player.position.y;

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