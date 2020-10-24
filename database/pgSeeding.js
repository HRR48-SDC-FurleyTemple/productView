const { Client } = require('pg');
const path = require('path');
const client = require('./pgConnect.js');

const startingTime = new Date;

const query = `\COPY records FROM '${path.join(__dirname + '/records.csv')}' DELIMITER '|' CSV HEADER;`;

client.query(query, (err, res)=>{
  if (err) {
    return console.error(err);
  }
  console.log('finished seeding Postgres database: ' + (new Date - startingTime)/1000 + " seconds");
  client.end();
})
