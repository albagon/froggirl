'use strict';
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
    this.sprite = 'images/char-cat-girl.png';
    // This column value should be the middle column
    this.x = 2 * 101;
    // This row value should be the bottom grass row
    this.y = 5 * 80;
    // These 2 properties will be useful when checking for collisions
    // (1) The real height of the player
    this.height = 75;
    // (2) The real width of the player
    this.width = 95;
    // The number of hearts/lives
    this.hearts = 5;
    // The x value of the characters that made it to the water
    this.allSaved = [];
    this.active = true;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // Check if the player has won
    if(this.allSaved.length === 3){
        this.stopGame('congrats');
    }
};

// Draw the characters in the water and the player on the screen
// Required method for game
Player.prototype.render = function() {
    let allSaved = this.allSaved;
    let sprite = this.sprite;

    // Loop through all of the objects within the allSaved array
    // and draw them.
    allSaved.forEach(function(saved) {
        ctx.drawImage(Resources.get(sprite), saved, -15);
    });

    // Draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the keys input, required method for game
// Parameter: key, whether the player should go up, down, left or right
Player.prototype.handleInput = function(key) {
    if(this.active){
        switch (key) {
            case 'left':
                if(this.x !== 0){
                    this.x = this.x - 101;
                }
                break;
            case 'up':
                // Check if the player can move up INSIDE the canvas
                if(this.y !== -15){
                    // Check if the player wants to move to
                    // an occupied space in the water.
                    let nextYPosition = this.y - 83;

                    if(nextYPosition === -15 && this.allSaved.includes(this.x)){
                      // This space in the water is occupied
                      // Do not move
                      break;
                    }
                    // The player moves up
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
    }
    // The player is not active, don't move
};

// Return the real 'y' value where the player drawing starts
// This method is called in Player.prototype.toMap
Player.prototype.getRealY = function() {
    return this.y + 65;
};

// Save the location of the player in the water
// Save only x because y will always be -15
Player.prototype.saveMe = function() {
    this.allSaved.push(this.x);
}

// Place the player at the start position
// This method is called after a collision with an enemy happens
// and at the beggining of the startGame() function.
Player.prototype.begin = function() {
    // This column value should be the middle column
    this.x = 2 * 101;
    // This row value should be the bottom grass row
    this.y = 5 * 80;
};

// This method is called after a collision with an enemy happens
Player.prototype.loseHeart = function() {
    // Get heart to be erased
    const heart = document.getElementById('heart'+this.hearts);
    // Erase heart from score panel
    if(heart !== null){
        heart.classList.replace('fas', 'far');
    }

    // Lose a heart
    this.hearts = this.hearts - 1;
    console.log('hearts = '+this.hearts);

    if(this.hearts === 0){
        // Game over
        console.log('game over');
        this.stopGame('game-over');
    }
};

/**
* description: This method inactivates the player, erasers all the
* enemies, erasers the characters in the water, clears the enemiesInterval
* and pops up a modal. It is called when the player either wins or loses.
* param: {string} msg
*/
Player.prototype.stopGame = function(msg) {
    this.active = false;
    allEnemies = [];
    // Clear array of saved characters
    this.allSaved = [];
    // Stop the enemies
    stopEnemies(enemiesInterval);
    // Pop up a modal to congratulate the player
    popUpModal(msg);
};

// Place all enemy objects in an array called allEnemies
function createEnemies(){
    let nowNumber = Date.now();
    let lastDigit = nowNumber % 10;
    let speed = (lastDigit * 10) + 120;

    // Create enemy randomly
    switch (lastDigit) {
        case 0:
        case 7:
        case 1:
        case 2:
            // The value of y is 63, that is the first stone row
            let enemy1 = new Enemy(63, speed);
            allEnemies.push(enemy1);
            break;
        case 3:
        case 8:
             // The value of y is 83 more than the first stone row
            let enemy2 = new Enemy(146, speed);
            allEnemies.push(enemy2);
            break;
        case 4:
        case 5:
        case 6:
            // The value of y is 83 more than the second stone row
            let enemy3 = new Enemy(229, speed);
            allEnemies.push(enemy3);
            break;
        default:
            // Do not create enemy
    }
}

/**
* description: Stops the creation of enemies
* param: {interval} tmr
*/
function stopEnemies(tmr) {
    window.clearInterval(tmr);
}

/**
* description: The modal
* param: {string} msg ('game-over' / 'congrats')
*/
function popUpModal(msg) {
    // Update the game statistics in the modal
    switch (msg) {
      case 'congrats':
          // It's a happy modal
          document.getElementById('modalMsg').textContent = 'Congratulations! You Won!';
          document.getElementById('modalHearts').textContent = player.hearts;
          document.getElementById('modalP').style.display = 'block';
          break;
      case 'game-over':
          // It's a sad modal
          document.getElementById('modalMsg').textContent = 'GAME OVER';
          document.getElementById('modalP').style.display = 'none';
          break;
      default:

    }
    // Open the modal
    modal.style.display = 'block';
}

/**
* description: This function starts a new game
*/
function startGame() {
    player.hearts = 5;
    // Put player in the start position
    player.begin();
    player.active = true;

    // const moves = document.querySelector('.moves');
    // moves.textContent = moveCounter;

    // Draw the 5 hearts in the panel
    const heartsIds = ['heart1', 'heart2', 'heart3', 'heart4', 'heart5'];
    heartsIds.forEach(function(id) {
        document.getElementById(id).classList.replace('far', 'fas');
    });

    // Create the first enemy
    createEnemies();
    // Continue creating enemies every 993 milliseconds
    enemiesInterval = window.setInterval(function() {
        createEnemies();
    }, 993);
}

// Place the player object in a variable called player
let player = new Player();
// Now instantiate your objects
let allEnemies = [];

createEnemies();
// Continue creating enemies every 993 milliseconds
let enemiesInterval = window.setInterval(function() {
    createEnemies();
}, 993);

// Get the modal
let modal = document.getElementById('myModal');
// Get the button that closes the modal
let modalButton = document.getElementById('modalButton');
// Add event listener to modal button
modalButton.addEventListener('click', function(){
  modal.style.display = 'none';
  startGame();
}, false);

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
