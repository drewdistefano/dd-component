const fs = require('fs');
const path = require('path')
const { conn } = require('./MariaDB-config.js');
const faker = require("faker");

//clears records file and populates with row of data n times
//run script using `node --max-old-space-size=4096 helper-functions.js`
const createRecordsFile = (value=100) => {
  let writePath = (__dirname, 'db_records_1.txt');
  let stream = fs.createWriteStream(writePath);

  for (let i=1; i<=value; i++){
    stream.write(`"${i}","${faker.name.findName()}","${faker.lorem.sentence()}",${Math.floor(Math.random()*100)},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.floor(Math.random()*50)},${Math.floor(Math.random()*25)}\n`);  }
  console.log('done writing to db_records_1.txt');
};

createRecordsFile();

const fastSeed = () => {
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

//loops through an insert query n times
//very slow insertion method!
const seed = (value=2) => {
  let startTime = new Date();
  conn()
  .then((connection)=>{
    connection.query('DELETE FROM records;');
    while (value > 0){
      connection.query(
        `
        INSERT INTO records (username, body, score, prosconsReliability, prosconsDurability, prosconsLooks, performance, prosconsValue, likes, dislikes) VALUES ("Elvis Russell", "Too many cooks spoil the broth.", 3, 1, 0, 1, 0, 1, 30, 2);
        `
      )
      .then(()=>{console.log(`insertion loop has run from ${startTime} to ${new Date()}`)})
      .catch((err)=>{console.log('error! unable to insert: ', err)});
      value --;
    }
  })
  .catch((err)=>{'ERROR! Unable to insert data: ', err});
};

module.exports = { seed, fastSeed, createRecordsFile };
