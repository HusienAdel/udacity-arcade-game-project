// TODO: enemies check for collision amongst eachother, adjust their speed to the one in front of them.
//TODO winning dance animation
//TODO score
// TODO: lives

"use strict"

let randomInteger = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

let win = false;

let allEnemies = [];
let enemyCount = 0;


// This timer seems overly complicated. Any suggestions on how to improve this timer?
const spawnTimer = function() {
  const s = setInterval(game.spawnEnemies, spawnFrequency);
};
let spawnFrequency = 2000;

function stopSpawnTimer() {
  clearInterval(spawnTimer);
};


const container = document.querySelector('.container');
const modal = container.querySelector('.modal')
const closeButton = modal.querySelector('.close-btn');
const newGameButton = modal.querySelector('#new-game');

class Character {

  constructor(sprite, x, y, radius, speed, name) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.name = name;
  }

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
// Enemies our player must avoid
class Enemy extends Character{

    constructor(sprite, x, y, radius, speed, name) {
      super('images/enemy-bug.png', -100, (randomInteger(3) + 1) * 100, 20, randomInteger(10), `enemy${enemyCount}`);
    }

    update(dt) {
        this.x += (this.speed * 50) * dt;
        game.checkCollisionWithPlayer(this.x, this.y, this.radius);
    }

    render() {
      super.render();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(sprite, x, y, radius, speed, name) {
      super('images/char-boy.png', 200, 400, 20, 0, 'player1');
    }

    update(dt){
      // check if winning condition is met
      if (player.y === 0) {
        player.y = -10;
        game.playerWon();
      }
    }

    render() {
      super.render();
    }

    reset() {
      player.x = 200;
      player.y = 400;
    }

    handleInput(e){
      if (win === false) {
        if (e === 'left' && player.x > 0) {
            player.x -= 100;
          }
          if (e === 'right' && player.x < 400) {
            player.x += 100;
          }
          if (e === 'up' && player.y > 0) {
            player.y -= 100;
          }
          if (e === 'down' && player.y < 400) {
            player.y += 100;
          }
        };
      };

      reset() {
        player.x = 200;
        player.y = 400;
      };
};

const player = new Player();

const game = {
  spawnEnemies() {
    enemyCount++;
    const enemy = new Enemy(enemyCount);
    allEnemies.push(enemy);

    if (enemyCount >= 20) {
      enemyCount = 0;
    };
    //Question: Are the objects, that are filtered out, collected by the JS garbage collection? This is my attempt to not fill up memory with unneeded enemy objects.
    allEnemies = allEnemies.filter(enemy => enemy.x <= 600);
  },

  checkCollisionWithPlayer(x, y, radius) {
      let dx = x - player.x;
      let dy = y - player.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius + player.radius) {
        player.reset();
      }
  },

  playerWon() {
    win = true;
    stopSpawnTimer();
    game.toggleModal();
  },

  toggleModal() {
    modal.classList.toggle('show-modal');
  },

  reset() {
    win = false;
    game.toggleModal();
    game.init();
    player.reset();
  },

  init() {
    spawnTimer();
  },
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

newGameButton.addEventListener('click', game.reset);

window.onload = function() {
  game.init();
}
