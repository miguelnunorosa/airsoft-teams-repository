const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const teams = [
    { id: 1, name: 'Team A', logo: 'https://via.placeholder.com/50', description: 'This is Team A' },
    { id: 2, name: 'Team B', logo: 'https://via.placeholder.com/50', description: 'This is Team B' },
    { id: 3, name: 'Team C', logo: 'https://via.placeholder.com/50', description: 'This is Team C' },
];

app.get('/teams', (req, res) => {
    res.json(teams);
});

app.get('/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));
    if (team) {
        res.json(team);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
