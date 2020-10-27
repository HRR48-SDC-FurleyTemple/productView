const pgtools = require("pgtools");
const { Client } = require('pg');
const credentials = require('./credentials.js');

var client;

const finalizedCredentials = Object.assign({}, credentials.initial);
finalizedCredentials.database = "tenmillionrecords";
client = new Client(finalizedCredentials);

client.connect((err, res) => {
  if (err) {
    return console.log('Connection failed. Error occurred:', err);
  }
  return console.log('Connected to database: tenmillionrecords');
})

module.exports = client;
