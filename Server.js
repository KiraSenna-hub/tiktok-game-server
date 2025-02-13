const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let players = {};

app.post('/webhook', (req, res) => {
    const data = req.body;
    if (data && data.event === "comment" && data.username) {
        const username = data.username.toLowerCase();
        if (!players[username]) {
            players[username] = { score: 0, hasPlayed: false };
            console.log(`Player registered: ${username}`);
        }
    }
    res.status(200).send("Received");
});

app.get('/players', (req, res) => {
    res.json(players);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
