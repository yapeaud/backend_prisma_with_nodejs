const express = require('express');

const app = express();
app.use(express.json());

app.use('/categories', require('./routes/category.route'));
app.use('/products', require('./routes/product.route'));

app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port localhost:3000');
});