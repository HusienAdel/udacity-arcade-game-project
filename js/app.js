// TODO: enemies check for collision amongst eachother, adjust their speed to the one in front of them.
//TODO winning dance animation
//TODO score
// TODO: Timer
// TODO: lives

"use strict"

class Game {

  constructor() {

  }

  spawnEnemies() {
      enemyCount++;
      const enemy = new Enemy(enemyCount);
      allEnemies.push(enemy);

      if (enemyCount >= 20) {
        enemyCount = 0;
      };
      //Question: Are the objects, that are filtered out, collected by the JS garbage collection? This is my attempt to not fill up memory with unneeded enemy objects.
      allEnemies = allEnemies.filter(enemy => enemy.x <= 600);
  }

  checkCollisionWithPlayer(x, y, radius) {
      let dx = x - player.x;
      let dy = y - player.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius + player.radius) {
        player.reset();
      }
  }

  playerWon() {
    win = true;
    stopSpawnTimer();
    this.toggleModal();
  }

  reset() {
    win = false;
    this.toggleModal();
    this.init();
    player.reset();
  }

  toggleModal() {
    modal.classList.toggle('show-modal');
  }

  init() {
    spawnTimer();
  }
};

const game = new Game();

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
};

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

class Player extends Character {
    constructor(sprite, x, y, radius, speed, name) {
      super('images/char-boy.png', 200, 400, 20, 0, 'player1');
    }

    update(dt){
      // check if winning condition is met
      if (this.y === 0) {
        this.y = -10;
        game.playerWon();
      }
    }

    render() {
      super.render();
    }

    reset() {
      this.x = 200;
      this.y = 400;
    }

    handleInput(e){
      if (win === false) {
        if (e === 'left' && this.x > 0) {
            this.x -= 100;
          }
          if (e === 'right' && this.x < 400) {
            this.x += 100;
          }
          if (e === 'up' && this.y > 0) {
            this.y -= 100;
          }
          if (e === 'down' && this.y < 400) {
            this.y += 100;
        }
      };
    };
};

const player = new Player();

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

// Binding 'this' to the reset function, otherwise it's set to the button, invoking the function.
const resetGame = game.reset.bind(game);
newGameButton.addEventListener('click', resetGame);

window.onload = function() {
  game.init();
}
