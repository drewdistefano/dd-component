const fs = require('fs');
const path = require('path')
const { pool } = require('./MariaDB-config.js');
const faker = require("faker");

//clears records file and populates with row of data n times
//run script using `node --max-old-space-size=4096 helper-functions.js`
const generateData = (value=10000000) => {
  console.log("generating data...")
  let writePath = (__dirname, './db/SDC/db_records_1.txt');
  let stream = fs.createWriteStream(writePath);

  for (let i=1; i<=value; i++){
    stream.write(`${i},${Math.round(Math.random()*500000)},"${faker.name.findName()}","${faker.lorem.sentence()}",${Math.round(Math.random()*5)},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.floor(Math.random()*50)},${Math.floor(Math.random()*25)}\n`);  }
  console.log('done writing to db_records_1.txt');
};

generateData();

//seeds the database from .txt file
const seed = () => {
  pool.getConnection()
  .then((connection)=>{
    // connection.query(`DELETE FROM records;`) <<< do I need this ? or will REPLACE keyword (below) suffice?
    console.log('loading data...'); 
    connection.query(`LOAD DATA INFILE '${__dirname + `./db/SDC/db_records_1.txt`}' REPLACE INTO TABLE records FIELDS TERMINATED BY ',';`)
    .then(()=>{console.log('indexing data...'); connection.query(`CREATE OR REPLACE INDEX index_id ON records (id);`)})
    .then(()=>{console.log('Done seeding MariaDB!')})
    .catch((err)=>{console.log('Unable to seed MariaDB ', err)})
  })
  .catch((err)=>{console.log('Error! unable to connect to MariaDB: ', err)})
};

seed()