const fs = require('fs');
const path = require('path')
const { pool } = require('./MariaDB-config.js');
const faker = require("faker");

//clears records file and populates with row of data n times
//run script using `node --max-old-space-size=4096 helper-functions.js`
const generateData = (value=100) => {
  let writePath = (__dirname, 'db_records_1.txt');
  let stream = fs.createWriteStream(writePath);

  for (let i=1; i<=value; i++){
    stream.write(`"${i}","${faker.name.findName()}","${faker.lorem.sentence()}",${Math.floor(Math.random()*100)},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.floor(Math.random()*50)},${Math.floor(Math.random()*25)}\n`);  }
  console.log('done writing to db_records_1.txt');
};

//seeds the database from a .txt file
const seed = () => {
  let startTime = new Date();
  conn()
  .then((connection)=>{
    connection.query('DELETE FROM records;')
    .then(connection.query(`LOAD DATA INFILE 'db_records_1.txt' INTO TABLE records FIELDS TERMINATED BY ',';`, ()=>{
      if (err){
        callback(err);
      }
      else {
        callback(null, data);
      }
    }))
  })
};

//Gets reviews based on product id
const getReviewsById = (productId, callback) => {
  pool.getConnection()
  .then((connection)=>{
    console.log('connected to MariaDB!')
    connection.query(`SELECT * FROM records WHERE id = ${productId}`)
    .then((data)=>{
      console.log('data retrieved from MariaDB!')
      callback(null, data)
    })
    .catch((err)=>{
      callback(err)
    })
  })
  .catch((err)=>{
    callback(err)
  })
}

module.exports = { generateData, seed, getReviewsById };