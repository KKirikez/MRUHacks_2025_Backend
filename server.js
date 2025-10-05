const express = require('express');
const { signalUp, signalDown } = require('./index');

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => res.json({ ok: true }));

app.post('/up', signalUp);
app.post('/down', signalDown
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
