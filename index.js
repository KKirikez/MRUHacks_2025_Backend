const { moveUp, moveDown, setHealthLED } = require('./controllers/stepper');
const fs = require('fs');
const path = require('path');

let maxHealth = 3;
let minHealth = 1;
let health = 1;


function signalUp() {
    if (health <= maxHealth) {
        health++;
        moveUp();
        console.log(`Health increased to ${health}`);
        setHealthLEDColour(health);
    } else {
        console.log(`Health is at maximum (${maxHealth})`);
    }
    console.log("Moved up");
};

function signalDown() {
    if (health >= minHealth) {
        health--;
        moveDown();
        console.log(`Health decreased to ${health}`);
        setHealthLEDColour(health);
    } else {
        console.log(`Health is at minimum (${minHealth})`);
    }
    console.log("Moved down");
};

function ping(req, res) {
    return health;
}

function setHealthLEDColour(health) {
    switch (health) {
        case 1:
            console.log("Health is 1, setting LED to RED");
            setHealthLED('RED');
            break;
        case 2:
            console.log("Health is 2, setting LED to ORANGE");
            setHealthLED('YELLOW');
            break;
        default:
            console.log("Health is 3, setting LED to GREEN");
            setHealthLED('GREEN');
            break;
    }
}

function debugSetHealth(newHealth) {
    if (newHealth < minHealth || newHealth > maxHealth) {
        throw new Error(`Health must be between ${minHealth} and ${maxHealth}`);
    }
    health = newHealth;
    setHealthLEDColour(health);
    console.log(`Health set to ${health}`);
}



module.exports = { signalUp, signalDown, ping, debugSetHealth };