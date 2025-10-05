const { sendCmd } = require('../serial');

async function moveUp() {
  sendCmd('STEP_UP');
}

async function moveDown() {
  sendCmd('STEP_DOWN');
}

async function setHealthLED(colour) {
  sendCmd('SET_'+colour);
}

module.exports = { moveUp, moveDown, setHealthLED };
