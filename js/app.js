// Enemies our player must avoid
// Parameter: y, can be 1, 2 or 3 because those are the stone rows
var Enemy = function(y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // This column value should start in 1 because the enemy always
    // moves from the beginning of the canvas from left to right
    this.x = 1;
    // This row value should be any of the 3 stone rows
    this.y = y;
    // These 3 properties will be useful when checking for collisions:
    // (1) The real 'y' value where the enemy starts
    this.ry = this.y + 75;
    // (2) The real height of the enemy
    this.height = 75;
    // (3) The real width of the enemy
    this.width = 95;
    // The speed of the enemy. A small number is a slow speed.
    // The recommended value is between 120 and 200
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);
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
    // This column value should be the middle column
    this.x = 2 * 101;
    // This row value should be the bottom grass row
    this.y = 5 * 80;
    // This property will be useful when checking for collisions
    // The real height of the player
    this.height = 75;
    this.width = 95;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

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
            if(this.y !== -15){
                this.y = this.y - 83;
            }
            break;
        case 'right':
            if(this.x !== 404){
                this.x = this.x + 101;
            }
            break;
        case 'down':
            if(this.y !== 400){
                this.y = this.y + 83;
            }
            break;
        default:

    }
};

// Return the real 'y' value where the player drawing starts
// This method is called in Player.prototype.toMap
Player.prototype.getRealY = function() {
    return this.y + 65;
};

// Place the player at the start position
// This method is called after a collision with an enemy happens
Player.prototype.begin = function() {
    // This column value should be the middle column
    this.x = 2 * 101;
    // This row value should be the bottom grass row
    this.y = 5 * 80;
};

// Place all enemy objects in an array called allEnemies
function createEnemies(){
    let nowNumber = Date.now();
    let lastDigit = nowNumber % 10;
    let speed = (lastDigit * 10) + 110;
    // console.log('The last digit of ' + nowNumber + ' is ' + lastDigit);
    // Create enemy randomly
    switch (lastDigit) {
        case 8:
        case 7:
            // The value of y is 63, that is the first stone row
            let enemy1 = new Enemy(63, speed);
            allEnemies.push(enemy1);
            break;
        case 3:
        case 9:
             // The value of y is 83 more than the first stone row
            let enemy2 = new Enemy(146, speed);
            allEnemies.push(enemy2);
            break;
        case 4:
        case 6:
            // The value of y is 83 more than the second stone row
            let enemy3 = new Enemy(229, speed);
            allEnemies.push(enemy3);
            break;
        default:
            // Do not create enemy
    }
}

// Place the player object in a variable called player
let player = new Player();
// Now instantiate your objects
let allEnemies = [];
// Create the first enemy
createEnemies();
// Continue creating enemies every 993 milliseconds
let enemiesInterval = window.setInterval(function() {
    createEnemies();
}, 993);

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
