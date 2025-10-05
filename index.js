const { moveUp, moveDown } = require('./controllers/stepper');

let health = 0;
let maxHealth = 5;
let minHealth = 0;


function signalUp() {
    if (health < maxHealth) {
        health++;
        moveUp();
        console.log(`Health increased to ${health}`);
    }
};

function signalDown() {
    if (health > minHealth) {
        health--;
        moveDown();
        console.log(`Health decreased to ${health}`);
    }
};

module.exports = { signalUp, signalDown };