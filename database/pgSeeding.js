const { Client } = require('pg');
const credentials = require('./credentials.js');
const path = require('path');

var client;
const startingTime = new Date;

const finalizedCredentials = Object.assign({}, credentials.initial);
finalizedCredentials.database = "tenmillionrecords";
client = new Client(finalizedCredentials);
client.connect();
const query = `\COPY records FROM '${path.join(__dirname + '/records.csv')}' DELIMITER ',' CSV HEADER;`;

client.query(query, (err, res)=>{
  if (err) {
    return console.error(err);
  }
  console.log('finished seeding Postgres database: ' + (new Date - startingTime)/1000 + " seconds");
  client.end();
})
