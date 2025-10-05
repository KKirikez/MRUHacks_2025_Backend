const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
app.use(express.json());

const SERIAL_PATH = process.env.SERIAL_PATH || '/dev/ttyACM0';
const BAUD = 115200;

const port = new SerialPort({ path: SERIAL_PATH, baudRate: BAUD });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => {
  console.log('Serial connected on', SERIAL_PATH);
});

parser.on('data', line => {
  console.log('Arduino ->', line);
});

app.get('/ping', (req, res) => {
  res.json({ ok: true, message: 'Server is alive' });
});

app.post('/cmd', (req, res) => {
  const { cmd } = req.body;
  if (!cmd) return res.status(400).json({ error: 'No cmd provided' });

  try{
    port.write(cmd + '\n', err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ sent: cmd });
    });
  } catch(err){
    console.log('Error writing to serial:', err);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
