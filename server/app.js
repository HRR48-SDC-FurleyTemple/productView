const express = require('express');
const app = express();
const db = require('../database/index.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use('/*', (req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/productView/products/:id', (req, res) => {
    console.log('get request happening')
    db.find({id: req.params.id})
    .then((resp) => {
        res.json(resp)
    })
    .catch((err) => {
        console.error(err);
        res.end();
    })
})

app.delete('/api/productView/products/:id', (req, res) => {
    console.log('delete request happening')
    db.deleteMany({id: req.params.id})
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error) => {
        console.log(error);
        res.status(404).send();
    })
})

app.put('/api/productView/products/:id', (req, res) => {
    console.log('put request happening')
    console.log('body', req.body)
    db.updateMany({id: req.params.id}, {$set: req.body, $currentDate: {lastModified: true}})
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error) => {
        console.log(error);
        res.status(404).send();
    })
})

app.post('/api/productView/products/:id', (req, res) => {
    console.log('post request happening')
    console.log('body', req.body)
    const {packaging, sizes, imageUrls, name, description, articleNumber, details, materials, sustainibility} = req.body;
    const id = req.params.id;
    db.insertOne({packaging, sizes, imageUrls, name, description, articleNumber, details, materials, sustainibility, id})
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error) => {
        console.log(error);
        res.status(404).send();
    })
})

module.exports = app;
