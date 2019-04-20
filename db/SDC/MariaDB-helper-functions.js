const fs = require('fs');
const path = require('path')
const { pool } = require('./MariaDB-config.js');
const faker = require("faker");

//clears records file and populates with row of data n times
//run script using `node --max-old-space-size=4096 helper-functions.js`
const generateData = (value=100) => {
  console.log("generating data...")
  let writePath = (__dirname, 'db_records_1.txt');
  let stream = fs.createWriteStream(writePath);

  for (let i=1; i<=value; i++){
    stream.write(`${Math.round(Math.random()*100000)},"${faker.name.findName()}","${faker.lorem.sentence()}",${Math.round(Math.random()*5)},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.floor(Math.random()*50)},${Math.floor(Math.random()*25)}\n`);  }
  console.log('done writing to db_records_1.txt');
};

generateData();

//seeds the database from a .txt file
const seed = () => {
  console.log('beginning data seed...')
  let startTime = new Date();
  pool.getConnection()
  .then((connection)=>{
    connection.query('DELETE FROM records;')
    .then(connection.query(`LOAD DATA INFILE '/Users/drewdistefano/Documents/code/dd-component/db/SDC/db_records_1.txt' INTO TABLE records FIELDS TERMINATED BY ',';`))
    .then(()=>{console.log('MariaDB done seeding!')})
    .catch(()=>{console.log('unable to seed MariaDB')})
  })
  .catch((err)=>{console.log('error! unable to seed MariaDB: ', err)})
};

seed()

//Gets reviews based on product id
const getReviewsById = (productId, callback) => {
  pool.getConnection()
  .then((connection)=>{
    console.log(`connected to MariaDB!, searching for productId ${productId}`)
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