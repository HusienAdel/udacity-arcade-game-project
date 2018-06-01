//TODO implement collision 

let win = false;
let gameRunning = true
let randomInteger = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
let allEnemies = [];
let enemyCount = 0;

// Enemies our player must avoid
class Enemy {

    constructor() {
      this.sprite = 'images/enemy-bug.png';
      this.x = -100;
      //TODO align the positioning on the y-axis with the tiles of the canvas => shuffled array, pick first
      this.y = (randomInteger(3) + 1) * 100;
      this.speed = randomInteger(10);
      this.name = `enemy${enemyCount}`;
    }

    update(dt) {
        this.x += (this.speed * 50) * dt;

        if (this.x > 600) { // take the enemies from the array once they are off canvas.
          allEnemies = allEnemies.filter(enemy => enemy.name != this.name);
        }
    }

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

const player = new Player();

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
  gameRunning = false;
  player.x = 200;
  player.y = 400;
};

if (gameRunning === true) {
  spawnTime = setInterval(spawnEnemies, 2000);
}
