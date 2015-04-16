// Draw the enemy on the screen, required method for game

Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player reset

Object.prototype.reset = function() {

  player.x = 200;
  player.y = 400;

}

// Enemies our player must avoid
var Enemy = function(x, y) {

    // The image/sprite for our enemies, this uses

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200 + 100);
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 550) {
      this.x =+ this.speed * dt;
    }
    else {
      this.x = -2;
    }

    //If player comes within 25px of an enemy, reset game
    if (player.x >= this.x - 25 && player.x <= this.x + 25) {
      if (player.y >= this.y - 25 && player.y <= this.y + 25) {
        this.reset();
      }
    }
}

//Player Object

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;

}

Player.prototype.update = function() {
  //move left
  if (this.ctlKey === "left" && this.x > 0) {
      this.x = this.x - 50;

  //move right
  } else if (this.ctlKey === "right" && this.x !== 400) {
      this.x = this.x + 50;

  //move up
  } else if (this.ctlKey === "up") {
      this.y = this.y - 50;

  //move down
  } else if (this.ctlKey === "down" && this.y !== 400) {
      this.y = this.y + 50;
  }
      this.ctlKey = null;

      // reset on water
      if (this.y < 25) {
        this.reset();
      }
}

//input handler
Player.prototype.handleInput = function(e) {
  this.ctlKey = e;
}

//Instantiation of player and enemy objects

var allEnemies = [];
(function setEnemies() {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2, 150));
  allEnemies.push(new Enemy(-2, 220));
}());

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
