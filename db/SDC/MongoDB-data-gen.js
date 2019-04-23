const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const { Item } = require('./MongoDB-schema')

//run script using `node --max-old-space-size=4096 MongoDB-helper-functions.js`
//to seed the file, run `npm run seed`
//review_id is not generated here since a unique `_id` value is created by MongoDB by default
const createRecordsFile = (value=10000000) => {
  console.log('Initializing csv...')
  let writePath = (__dirname, `./db/sdc/MongoDB_records_1.csv`);
  let stream = fs.createWriteStream(writePath);
  stream.write(`product_id,username,body,score,prosconsReliability,prosconsDurability,prosconsLooks,performance,prosconsValue,likes,dislikes\n`)
  for (let i=1; i<=value; i++){
    stream.write(`${Math.round(Math.random()*500000)},"${faker.name.findName()}","${faker.lorem.sentence()}",${Math.round(Math.random()*5)},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.floor(Math.random()*50)},${Math.floor(Math.random()*25)}\n`);
  }
  console.log(`Complete! ${value} records written to csv`);
};

createRecordsFile();