const cass = require('cassandra-driver');
const path = require('path');


var client = new cass.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'productview'
});

let tableQuery = `CREATE TABLE IF NOT EXISTS records (
  id int PRIMARY KEY,
  name TEXT,
  description TEXT,
  articleNumber TEXT,
  details TEXT,
  materials TEXT,
  sustainability TEXT,
  width int,
  height int,
  length int,
  weight int,
  packages int,
  shortDesc TEXT,
  threadCount int,
  pillowcaseQuantity int,
  duvetCoverLength int,
  duvetCoverWidth int,
  pillowcaseLength int,
  pillowcaseWidth int,
  fitting TEXT,
  imagesUrls TEXT
);`

// let recordsPath = path.join(__dirname + '/records.csv');

// let copyTableQuery = `COPY productview.records (id,name,description,articleNumber,details,materials,sustainability,width,height,length,weight,packages,shortDesc,threadCount,pillowcaseQuantity,duvetCoverLength,duvetCoverWidth,pillowcaseLength,pillowcaseWidth,fitting,imagesUrls)FROM '${recordsPath}' WITH DELIMITER=',' AND HEADER=TRUE ;`

client.execute(tableQuery, (err, res) => {
  if(err){
    return console.log('could not create table, error occurred');
  }
  console.log('created table');
  // let startTime = new Date;
  // client.execute(copyTableQuery, (err, res) => {
  //   if (err) {
  //     return console.log('could not copy table', err);
  //   }
  //   console.log('cassandra seeding completed: ' + (new Date - startTime)/1000 + " seconds");
    return client.shutdown();
  // })
})



// BENCHMARK TESTING

// GET REQUESTS:
// SELECT * FROM records WHERE id=4367593
// SELECT * FROM records WHERE id=3856982
// SELECT * FROM reocrds WHERE id=8524589

//POST REQUEST
// INSERT INTO records (id, name) VALUES (10000001, 'javier')
// INSERT INTO records (id, name, shortdesc, pillowcasequantity) VALUES (10000002, 'secondItem', 'this item does this and that and that much more', 7)
// INSERT INTO records (id,name,description,articleNumber,details,materials,sustainability,width,height,length,weight,packages,shortDesc,threadCount,pillowcaseQuantity,duvetCoverLength,duvetCoverWidth,pillowcaseLength,pillowcaseWidth,fitting,imagesUrls) VALUES (10000003, 'thirdItem', 'this is a description of the item', '19.251.14.544', 'here are a few details', 'materials are made of', 'some sus stuff', 4, 6, 3, 5, 4, 'short description', 4, 6, 3, 5, 4, 6, 'some information', 'here are some images urls')

// PUT REQUEST
// UPDATE records SET name = 'not javier' WHERE id = 10000001
// UPDATE records SET name = 'secondItemStill', fitting = 'this item still does things' WHERE id = 10000002
// UPDATE records SET imagesUrls = 'these are even more images', description = 'this is an additional description' WHERE id = 10000003

// DELETE REQUEST
// DELETE FROM records WHERE id = 658123
// DELETE FROM records WHERE id = 1485365
// DELETE FROM records WHERE id = 5893452
