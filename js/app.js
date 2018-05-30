//TODO Get the enemy going!

let win = false;

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 200;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt){

  if (player.y === 0) {

    win = true;

    setTimeout(function() {
      reset();
    }, 1000);
  }

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e){

  if (win === false)  { // Only allow movement as long as the winning condition is not met.

    if (e === 'left' && player.x > 0) {
      player.x = player.x -= 100;
      console.log(`player.x: ${player.x}`);
    }

    if (e === 'right' && player.x < 400) {
      player.x = player.x += 100;
      console.log(`player.x: ${player.x}`);
    }

    if (e === 'up' && player.y > 0) {
      player.y = player.y -= 100;
      console.log(`player.y: ${player.y}`);
    };

    if (e === 'down' && player.y < 400) {
      player.y = player.y += 100;
      console.log(`player.y: ${player.y}`);
    };
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
];
// Place the player object in a variable called player
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

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
