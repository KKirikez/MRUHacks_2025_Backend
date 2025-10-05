const express = require('express');
const { signalUp, signalDown, ping, debugSetHealth } = require('./index');

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  // I dont wanna set CORS up, and this isnt a real product
  health = ping();
  res.header("Access-Control-Allow-Origin", "*"); 
  res.json({ health });
});

app.post('/up', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  try {
    signalUp();
    res.json({ "up_ok": true});
  } catch (err) {
    res.json({ "error": err.message });
  }
});

app.post('/down', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  try {
    signalDown();
    res.json({ "down_ok": true});
  } catch (err) {
    res.json({ "error": err.message });
  }
});

app.post('/setHealth', ( req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  try {
    const { health } = req.body;
    if (typeof health !== 'number' || health < 0 || health > 3) {
      throw new Error('Health must be a number between 0 and 3');
    }
    debugSetHealth(health);
    res.json({ "setHealth_ok": true });
  } catch (err) {
    res.json({ "error": err.message });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});