const pgtools = require("pgtools");
const { Client } = require('pg');
const credentials = require('./credentials.js');

var client;

const createConnect = () => {
  const finalizedCredentials = Object.assign({}, credentials.initial);
  finalizedCredentials.database = "tenmillionrecords";
  client = new Client(finalizedCredentials);

  client.connect((err, res) => {
    if (err) {
      return pgtools.createdb(credentials.initial, "tenmillionrecords", function(err, res) {
        if (err) {
          console.log('error occurred:', err)
          process.exit(-1);
        }
      }).then((res) => {
        createConnect();
      })
    }
    console.log('Database successfully created!')
    return createTable();
  })
}

const createTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS records (
      id SERIAL PRIMARY KEY,
      name TEXT,
      description TEXT,
      articleNumber TEXT,
      details TEXT,
      materials TEXT,
      sustainability TEXT,
      width SMALLINT,
      height SMALLINT,
      length SMALLINT,
      weight SMALLINT,
      packages SMALLINT,
      shortDesc TEXT,
      threadCount SMALLINT,
      pillowcaseQuantity SMALLINT,
      duvetCoverLength SMALLINT,
      duvetCoverWidth SMALLINT,
      pillowcaseLength SMALLINT,
      pillowcaseWidth SMALLINT,
      fitting TEXT,
      imagesUrls TEXT[]
    );
  `;

  client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table successfully created!')
    client.end();
  });
}

createConnect();
