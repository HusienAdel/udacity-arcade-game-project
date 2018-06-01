//TODO Get the enemy going!

let win = false;
let gameStarted = true
let randomInteger = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor() {
      this.sprite = 'images/enemy-bug.png';
      this.x = -100;
      this.y = randomInteger(3) * 100;
      this.speed = randomInteger(10);
      this.name = `enemy${enemyCount}`;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {

        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += (505 / this.speed) * dt;

        if (this.x > 600) {
          allEnemies = allEnemies.filter(enemy => enemy.name != this.name);


        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
      this.sprite = 'images/char-boy.png';
      this.x = 200;
      this.y = 400;
    }

    update(dt){

      if (player.y === 0) {
        win = true;
        setTimeout(function() {
          reset();
        }, 1000);
      }
    }

    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e){

      if (win === false)  { // Only allow movement as long as the winning condition is not met.

        if (e === 'left' && player.x > 0) {
          player.x = player.x -= 100;
        }
        if (e === 'right' && player.x < 400) {
          player.x = player.x += 100;
        }
        if (e === 'up' && player.y > 0) {
          player.y = player.y -= 100;
        }
        if (e === 'down' && player.y < 400) {
          player.y = player.y += 100;
        }
      };
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Place the player object in a variable called player
const player = new Player();
//const bug = new Enemy();

let allEnemies = [];

let enemyCount = 0;

function spawnEnemies() {
  enemyCount++;
  const enemy = new Enemy(enemyCount);
  allEnemies.push(enemy);

  if (enemyCount >= 10) {
    enemyCount = 0;
  };
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//reset the game to the initial state
function reset() {
  win = false;
  player.x = 200;
  player.y = 400;
};

if (gameStarted === true) {
  spawnTime = setInterval(spawnEnemies, 2000);
}
