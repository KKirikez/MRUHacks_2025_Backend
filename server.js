const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
