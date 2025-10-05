const { sendCmd } = require('../serial');

async function moveUp(req, res) {
  try {
    await sendCmd('STEP_UP');
    res.json({ ok: true, action: 'up' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function moveDown(req, res) {
  try {
    await sendCmd('STEP_DOWN');
    res.json({ ok: true, action: 'down' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { moveUp, moveDown };
