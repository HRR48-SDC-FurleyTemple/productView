const newrelic = require('newrelic');
const express = require('express');
const client = require('./pgClient.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use('/*', (req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/productView/products/:id', client.getProduct);
app.post('/api/productView/products/:id', client.add);


const port = 3050;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
