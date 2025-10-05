const express = require('express');
const { signalUp, signalDown } = require('./index');

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => res.json({ ok: true }));

app.post('/up', (req, res) => {
  try {
    signalUp();
    res.json({ up_ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/down', (req, res) => {
  try {
    signalDown();
    res.json({ down_ok: true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
