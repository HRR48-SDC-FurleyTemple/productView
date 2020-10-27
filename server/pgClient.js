const client = require('../database/pgConnect.js');

exports.getProduct = (req, res) => {
  let query = `SELECT * FROM records WHERE id=${req.params.id}`;
  // console.log('GET', req.params.id);
  // var startTime = new Date;
  client.query(query, (error, results) => {
    if (error) {
      return console.log('error happened', error);
    }
    var result = [{
      packaging: {
        measurments: {
          width: results.rows[0].width,
          height: results.rows[0].height,
          length: results.rows[0].length,
          packages: results.rows[0].packages
        }
      },
      sizes: {
        attributes: {
          "thread-count": results.rows[0].threadcount,
          "Pillowcasse quantity": results.rows[0].pillowcasequantity,
          "Duvet cover length": results.rows[0].duvetcoverlength,
          "Duvet cover width": results.rows[0].duvetcoverwidth,
          "Pillowcase length": results.rows[0].pillowcaselength,
          "Pillowcase width": results.rows[0].pillowcasewidth
        },
        fitting: results.rows[0].fitting
      },
      imageUrls: results.rows[0].imagesurls,
      name: results.rows[0].name,
      id: results.rows[0].id,
      description: results.rows[0].description,
      articleNumber: results.rows[0].articlenumber,
      details: results.rows[0].details,
      materials: results.rows[0].materials,
      sustainibility: results.rows[0].sustainability
    }]
    // console.log(new Date - startTime);
    return res.send(result);
  })
};

exports.add = (req, res) => {
  // console.log('POST', req.params.id);
  // console.log('these are images urls',req.body.imagesurls);
  // const imagesurl = `ARRAY${req.body.imagesurls}`
  const query = `INSERT INTO records (id,name,description,articleNumber,details,materials,sustainability,width,height,length,weight,packages,shortDesc,threadCount,pillowcaseQuantity,duvetCoverLength,duvetCoverWidth,pillowcaseLength,pillowcaseWidth,fitting,imagesUrls) VALUES (nextval('records_sequence'),'${req.body.name}','${req.body.description}','${req.body.articleNumber}','${req.body.details}','${req.body.materials}','${req.body.sustainability}',${req.body.width},${req.body.height},${req.body.length},${req.body.weight},${req.body.packages},'${req.body.shortDesc}',${req.body.threadCount},${req.body.pillowcaseQuantity},${req.body.duvetCoverLength},${req.body.duvetCoverWidth},${req.body.pillowcaseLength},${req.body.pillowcaseWidth},'${req.body.fitting}', ARRAY${req.body.imagesurls});`

  client.query(query, (error, results) => {
    if (error) {
      console.log('Could not post', error)
      return res.status(404).send();
    }
    // console.log('posted');
    return res.status(200).send();
  })
}

// {
  // "name": "Javier",
  // "description": "this is the description",
  // "articleNumber": "27.4541.24.523",
  // "details": "these are details",
  // "materials": "random",
  // "sustainability": "do not know",
  // "width": 4,
  // "length": 4,
  // "height": 4,
  // "weight": 4,
  // "packages": 4,
  // "shortDesc": "this is short description",
  // "threadCount": 4,
  // "pillowcaseQuantity": 4,
  // "duvetCoverLength": 4,
  // "duvetCoverWidth": 4,
  // "pillowcaseLength": 4,
  // "pillowcaseWidth": 4,
  // "fitting": "almost done",
  // "imagesurls": "[1, 2, 3]"
// }