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
    this.radius = 9;

    this.previousCollisions = []
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
// const map = [
//   ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
//   ['-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '-', '.', '.', '.', '-', '-', '-', '-', '.', '.', '.', '-', '.', '.', '-'],
//   ['-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '.', '.', '-', '.', '.', '-', '-', '.', '.', '-', '.', '.', '.', '.', '-'],
//   ['-', '-', '-', '.', '-', '-', '.', '-', '-', '.', '-', '-', '.', '.', '-', '-', '-'],
//   ['-', '.', '-', '.', '-', '^', '.', '.', '.', '.', '.', '-', '.', '.', '-', '.', '-'],
//   ['-', '-', '-', '.', '-', '+', '-', '-', '-', '-', '.', '.', '.', '.', '-', '-', '-'],
//   ['-', '.', '.', '.', '.', '_', '-', '.', '.', '-', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '-', '-', '.', '.', '-', '.', '.', '-', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '.', '.', '.', '^', '-', '-', '-', '-', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '-', '.', '-', '5', '-', '.', '-', '.', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '-', '-', '.', '-', '5', '-', '.', '-', '.', '.', '.', '.', '.', '-', '-', '-'],
//   ['-', '.', '.', '.', '.', '^', '-', '-', '-', '-', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '.', '.', '-', '+', '.', '-', '-', '.', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '-', '-', '.', '-', '_', '.', '.', '.', '.', '.', '-', '.', '.', '-', '-', '-'],
//   ['-', '.', '-', '.', '-', '-', '.', '.', '.', '.', '-', '-', '.', '.', '-', '.', '-'],
//   ['-', '-', '-', '.', '-', '.', '.', '-', '-', '.', '.', '-', '.', '.', '-', '-', '-'],
//   ['-', '.', '.', '.', '.', '.', '.', '-', '-', '.', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
//   ['-', '.', '-', '.', '.', '.', '-', '-', '-', '-', '.', '.', '.', '-', '.', '.', '-'],
//   ['-', '.', '-', '.', '-', '5', '-', '.', '-', '.', '.', '.', '.', '.', '.', '.', '-'],

//   ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],

// ];
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|'],
  ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|'],
  ['|', '.', '-', '-', '.', '.', '.', '-', '-', '.', '|'],
  ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|'],
  ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|'],
  ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|'],
  ['|', '.', '-', '-', '.', '.', '.', '-', '-', '.', '|'],
  ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|'],
  ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
];

const boundaries = [];
const pellets = [];
const ghosts = [];
let collisions =[];
const player = new Player({
  position: {
    x: Boundary.width * 1.5,
    y: Boundary.width *1.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
const ghost = new Ghost({
  position:{
    x: 10 * Boundary.width - Boundary.width/2,
    y: 10 * Boundary.height - Boundary.height/2,
  },
  velocity: {
    x: -0.1,
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
        case '|':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
            }),
          );
          break;
          case '1':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
              }),
            );
            break;
            case '2':
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * j,
                    y: Boundary.height * i,
                  },
                }),
              );
              break;
              case '3':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i,
                    },
                  }),
                );
                break;
                case '4':
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
    let i =0

    ghosts.push(ghost)
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      player.update();

      ghosts.forEach((ghost)=>{
        ghost.update()
        const collisions = [];
        boundaries.forEach ((boundary) => {
          if (!collisions.includes('up') && collisionHappening({
            char: {...ghost,
            velocity:{
              x:0,
              y:-7,
            }
            } ,
            block: boundary,
          })) 
          {
            collisions.push('up')
            // cosole.log('ghost crashing up')
          }
          if (!collisions.includes('down') && collisionHappening({
            char: {...ghost,
            velocity:{
              x:0,
              y:7,
            }
            } ,
            block: boundary,
          })) 
          {
            collisions.push('down')
            // cosole.log('ghost crashing up')
          }
          if (!collisions.includes('left') && collisionHappening({
            char: {...ghost,
            velocity:{
              x:-7,
              y:0,
            }
            } ,
            block: boundary,
          })) 
          {
            collisions.push('left')
            // cosole.log('ghost crashing up')
          }
          if (!collisions.includes('right') && collisionHappening({
            char: {...ghost,
            velocity:{
              x:7,
              y:0,
            }
            } ,
            block: boundary,
          })) 
          {
            collisions.push('right')
            // cosole.log('ghost crashing up')
          }
      
        })
        
        

        if (collisions.length > ghost.previousCollisions.length)
            ghost.previousCollisions = collisions
        
        console.log({collisions})
        // console.log(ghost.previousCollisions)

        if((JSON.stringify(collisions) !== JSON.stringify(ghost.previousCollisions))) {

          if ((ghost.velocity.x > 0) && !(ghost.previousCollisions.includes('right'))) ghost.previousCollisions.push('right');
          else if ((ghost.velocity.y > 0) && !(ghost.previousCollisions.includes('down'))) ghost.previousCollisions.push('down');
          else if ((ghost.velocity.x < 0) && !(ghost.previousCollisions.includes('left'))) ghost.previousCollisions.push('left');
          else if ((ghost.velocity.y < 0) && !(ghost.previousCollisions.includes('up'))) ghost.previousCollisions.push('up');

          // console.log(ghost.previousCollisions)
          const pathways = ghost.previousCollisions.filter((collision) => {
            return !collisions.includes(collision)}
          )
          console.log({pathways})
          let newDirection = setDirection(ghost, pathways)
          console.log({newDirection})

          let test_v = 0.5
          switch(newDirection) {
            case 'up':  
              ghost.velocity.x = 0;
              ghost.velocity.y = -test_v;
              break;
            case 'down':    
              ghost.velocity.x = 0;
              ghost.velocity.y = test_v;
              break;
            case 'left':
              ghost.velocity.x = -test_v;
              ghost.velocity.y = 0;
              break;
            case 'right':
              ghost.velocity.x = test_v;
              ghost.velocity.y = 0;
              break;}
            
        } 


      })

        

      player.velocity.x = 0;
      player.velocity.y = 0;
      
  if (keys.w.pressed && lastkey === 'w') {
    boundaries.forEach((boundary) => {
    if (collisionHappening({
      char: {...player,
      velocity:{
        x:0,
        y:-7,
      }
      } ,
      block: boundary,
    })) 
    {
      player.velocity.y = 0;
      console.log('mf going to hit the top wall, y deactivated')
    }

    else
    player.velocity.y = -7;
  })
}
    
    else if (keys.a.pressed && lastkey === 'a') {
      boundaries.forEach((boundary) => {
        if (collisionHappening({
          char: {...player,
          velocity:{
            x:-7,
            y:0,
          }
          } ,
          block: boundary,
        })) 
        {
          player.velocity.x = 0;
        }
    
        else
        player.velocity.x = -7;
      }) 
  } else if (keys.s.pressed && lastkey === 's') {
    boundaries.forEach((boundary) => {
      if (collisionHappening({
        char: {...player,
        velocity:{
          x:0,
          y:7,
        }
        } ,
        block: boundary,
      })) 
      {
        player.velocity.y = 0;
      }
  
      else
      player.velocity.y = 7;
    })
  } else if (keys.d.pressed && lastkey === 'd') {
    boundaries.forEach((boundary) => {
      if (collisionHappening({
        char: {...player,
        velocity:{
          x:7,
          y:0,
        }
        } ,
        block: boundary,
      })) 
      {
        player.velocity.x = 0;
      }
  
      else
      player.velocity.x = 7;
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

function setDirection(char, pathways)
{
  function shortestDistanceHelper(char,target, {velocity}){
    return (Math.hypot(((char.position.x + velocity.x)  - target.x), ((char.position.y + velocity.y)  - target.y)  ))
  }
  let dists = []
  target = char.target
  pathways.forEach((path)=>{
    switch(path){
      case 'up':
        dists.push(shortestDistanceHelper(char,target, {velocity:{x:0, y: -0.5}}))
        break;
      case 'down':
        dists.push(shortestDistanceHelper(char,target, {velocity:{x:0, y: 0.5}}))
        break;
      case 'left':
        dists.push(shortestDistanceHelper(char,target, {velocity:{x:-0.5, y: 0}}))
        break;
      case 'right':
        dists.push(shortestDistanceHelper(char,target, {velocity:{x:0.5, y: 0}}))
        break;

    }
    
  })

  const min = Math.min(...dists);
  const index = dists.indexOf(min);

  return pathways[index]
}


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