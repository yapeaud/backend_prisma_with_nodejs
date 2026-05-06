const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', require('./routes/category.route'));
app.use('/products', require('./routes/product.route'));

// Server
app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port localhost:3000');
});