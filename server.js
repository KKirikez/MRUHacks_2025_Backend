const express = require('express');
const { signalUp, signalDown, startup, ping } = require('./index');

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  // I dont wanna set CORS up, and this isnt a real product
  res.header("Access-Control-Allow-Origin", "*"); 
  res.json({ health });
});

app.post('/up', (req, res) => {
  try {
    signalUp();
    res.json({ "up_ok": true});
  } catch (err) {
    res.json({ "error": err.message });
  }
});

app.post('/down', (req, res) => {
  try {
    signalDown();
    res.json({ "down_ok": true});
  } catch (err) {
    res.json({ "error": err.message });
  }
});

app.post('/start', (req, res) => {
  try {
    startup();
    res.json({ "start_ok": true });
  } catch (err) {
    res.json({ "error": err.message });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});