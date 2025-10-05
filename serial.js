const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const SERIAL_PATH = process.env.SERIAL_PATH || '/dev/ttyACM0';
const BAUD = 115200;

const port = new SerialPort({ path: SERIAL_PATH, baudRate: BAUD });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => console.log('Serial connected on', SERIAL_PATH));
parser.on('data', line => console.log('Arduino ->', line));

function sendCmd(cmd) {
  return new Promise((resolve, reject) => {
    port.write(cmd + '\n', err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = { sendCmd };
