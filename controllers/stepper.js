const { sendCmd } = require('../serial');

async function moveUp() {
  sendCmd('STEP_UP');
}

async function moveDown() {
    sendCmd('STEP_DOWN');
}

module.exports = { moveUp, moveDown };
