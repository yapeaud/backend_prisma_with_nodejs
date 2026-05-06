const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port localhost:3000');
});