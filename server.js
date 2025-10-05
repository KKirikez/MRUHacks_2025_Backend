const express = require('express');
const { moveUp, moveDown } = require('./controllers/stepper');

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => res.json({ ok: true }));

app.post('/stepper/up', moveUp);
app.post('/stepper/down', moveDown);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
