const faker = require('faker');
const fs = require('fs');

const headerTemplate = 'id|name|description|articleNumber|details|materials|sustainability|width|height|length|weight|packages|shortDesc|threadCount|pillowcaseQuantity|duvetCoverLength|duvetCoverWidth|pillowcaseLength|pillowcaseWidth|fitting|imagesUrls\n'
const writeRecords = fs.createWriteStream('database/records.csv');
writeRecords.write(headerTemplate, 'utf8');

function writeTenMillionRecords(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = dataGenerator(id);
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write()
}

var dataGenerator = (id) => {
  const name = faker.commerce.productName();
  const description = faker.lorem.words(18)
  const articleNumber = faker.internet.ip().toString();
  const details = faker.lorem.sentence();
  const materials = faker.lorem.sentence();
  const sustainability = faker.lorem.sentence();
  const width = Math.floor(Math.random() * 15 + 6);
  const height = Math.floor(Math.random() * 25 + 10);
  const length = Math.floor(Math.random() * 11 + 4);
  const weight = Math.floor(Math.random() * 25 + 13);
  const packages = Math.floor(Math.random() * 3 + 1);
  const shortDesc = faker.lorem.sentence();
  const threadCount = Math.floor(Math.random() * 300 + 100);
  const pillowcaseQuantity = Math.floor(Math.random() * 4 + 2);
  const duvetCoverLength = Math.floor(Math.random() * 4 + 2);
  const duvetCoverWidth = Math.floor(Math.random() * 4 + 2);
  const pillowcaseLength = Math.floor(Math.random() * 4 + 2);
  const pillowcaseWidth = Math.floor(Math.random() * 4 + 2);
  const fitting = faker.lorem.words() + ` (${faker.lorem.words()})`;
  const imagesGen = () => {
    let imagesArr = "{";
    let count = Math.floor(Math.random() * 15 + 6);
    let links = [
      "http://placeimg.com/640/480/fashion",
      "http://placeimg.com/640/480/abstract",
      "http://placeimg.com/640/480/animals",
      "http://placeimg.com/640/480/business",
      "http://placeimg.com/640/480/cats",
      "http://placeimg.com/640/480/city",
      "http://placeimg.com/640/480/food",
      "http://placeimg.com/640/480/nightlife",
      "http://placeimg.com/640/480/fashion",
      "http://placeimg.com/640/480/nature",
      "http://placeimg.com/640/480/fashion",
      "http://placeimg.com/640/480/abstract",
      "http://placeimg.com/640/480/animals",
      "http://placeimg.com/640/480/business",
      "http://placeimg.com/640/480/cats",
      "http://placeimg.com/640/480/city",
      "http://placeimg.com/640/480/food",
      "http://placeimg.com/640/480/nightlife",
      "http://placeimg.com/640/480/fashion",
      "http://placeimg.com/640/480/nature"
    ];
    for (i = 0; i < count; i++) {
      if (i === count-1) {
        imagesArr += links[i] + "}";
      } else {
        imagesArr += links[i] + ",";
      }
    }
    return imagesArr;
  }
  const images = imagesGen();
  return `${id}|${name}|${description}|${articleNumber}|${details}|${materials}|${sustainability}|${width}|${height}|${length}|${weight}|${packages}|${shortDesc}|${threadCount}|${pillowcaseQuantity}|${duvetCoverLength}|${duvetCoverWidth}|${pillowcaseLength}|${pillowcaseWidth}|${fitting}|${images}\n`;
}

var startingTime = new Date;
writeTenMillionRecords(writeRecords, 'utf-8', () => {
  console.log('finished data generation: ' + (new Date - startingTime)/1000 + " seconds")
  writeRecords.end();
});
