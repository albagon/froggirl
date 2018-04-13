// Enemies our player must avoid
// Parameter: y, can be 1, 2 or 3 because those are the stone rows
var Enemy = function(y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // This column value should start in 1 because the enemy always
    // moves from the beginning of the canvas from left to right
    this.x = 1;
    // This row value should be any of the 3 stone rows
    this.y = y * 63;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * 150);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// These are the cell sizes in the canvas: col * 101, row * 83

// This is the player
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // This column value should start in the middle column
    this.x = 2 * 101;
    // This row value should be the bottom grass row
    this.y = 5 * 76;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // The player should only move if a key is pressed
    // TODO: I could check for collisions here?
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the keys input, required method for game
// Parameter: key, whether the player should go up, down, left or right
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if(this.x !== 0){
                this.x = this.x - 101;
            }
            break;
        case 'up':
            if(this.y !== -35){
                this.y = this.y - 83;
            }
            break;
        case 'right':
            if(this.x !== 404){
                this.x = this.x + 101;
            }
            break;
        case 'down':
            if(this.y !== 380){
                this.y = this.y + 83;
            }
            break;
        default:

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let enemy1 = new Enemy(1);
allEnemies.push(enemy1);

// Place the player object in a variable called player
let player = new Player();

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
