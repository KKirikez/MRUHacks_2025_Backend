const { moveUp, moveDown } = require('./controllers/stepper');
const fs = require('fs');
const path = require('path');

let maxHealth = 3;
let minHealth = 0;
let health = 0;
let lastSignalTime = 0;
let checkInTime = 0;

function startup() {
    path.exists('./data/saved.txt', function(exists) { 
        if (exists) { 
          console.log('Saved file exists.')
            fs.readFile('./data/saved.txt', (err, data) => {
                if (err) throw err;
                let stats = JSON.parse(data);
                health = stats.health;
                lastSignalTime = stats.lastSignalTime;
                checkInTime = stats.checkInTime;
                console.log(`Health: ${health}, Last Signal Time: ${lastSignalTime}, Check In Time: ${checkInTime}`);
            });
        } else {
            let stats = {
                "health": 0,
                "lastSignalTime": 0,
                "checkInTime": 0
            }
            fs.writeFile('./data/saved.txt', JSON.stringify(stats), (err) => {
                if (err) throw err;
                console.log('Saved file created.');
            });
        }
      });
}


function signalUp() {
    if (health < maxHealth) {
        health++;
        moveUp();
        console.log(`Health increased to ${health}`);
    } else {
        console.log(`Health is at maximum (${maxHealth})`);
    }
    console.log("Moved up");
};

function signalDown() {
    if (health > minHealth) {
        health--;
        moveDown();
        console.log(`Health decreased to ${health}`);
    } else {
        console.log(`Health is at minimum (${minHealth})`);
    }
    console.log("Moved down");
};



module.exports = { signalUp, signalDown, startup };