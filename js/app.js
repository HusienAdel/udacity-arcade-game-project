//TODO something happens when plaeyer wins
//TODO Readme
//TODO winning dance animation
//TODO score
// TODO: lives



let randomInteger = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

let win = false;

let allEnemies = [];
let enemyCount = 0;

const container = document.querySelector('.container');
const modal = container.querySelector('.modal')
const closeButton = modal.querySelector('.close-btn');
const newGameButton = modal.querySelector('#new-game');


// Enemies our player must avoid
class Enemy {

    constructor() {
      this.sprite = 'images/enemy-bug.png';
      this.x = -100;
      //TODO align the positioning on the y-axis with the tiles of the canvas => shuffled array, pick first
      this.y = (randomInteger(3) + 1) * 100;
      this.speed = randomInteger(10);
      this.radius = 20;
      this.name = `enemy${enemyCount}`;
    }

    update(dt) {
        this.x += (this.speed * 50) * dt;

        if (this.x > 600) { // take the enemies from the array once they are off canvas.
          allEnemies = allEnemies.filter(enemy => enemy.name != this.name);
        }
        checkCollisionWithPlayer(this.x, this.y, this.radius);
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
      this.radius = 20;
    }

    update(dt){
      // check if winning condition is met
      if (player.y === 0) {
        player.y = -10;
        playerWon();
      /*  setTimeout(function() {
          reset();
        }, 1000); */
      }
    }

    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e){
      if (win === false) {
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
      };
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

function checkCollisionWithPlayer(x, y, radius) {
    let dx = x - player.x;
    let dy = y - player.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius + player.radius) {
      reset();
    }
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

function toggleModal() {
  modal.classList.toggle('show-modal');
};

//reset the game to the initial state
function reset() {
  player.x = 200;
  player.y = 400;
};

function spawnTimer () {
  spawnTime = setInterval(spawnEnemies, 1000);
};

function stopSpawnTimer() {
  clearInterval(spawnTime);
}

function initGame() {
  spawnTimer();

  player.x = 200;
  player.y = 400;
};

function resetGame() {
  win = false;
  toggleModal();
  initGame();
}

function playerWon() {
  win = true;
  stopSpawnTimer();
  toggleModal();
};

newGameButton.addEventListener('click', resetGame);

window.onload = function() {
  initGame();
}
