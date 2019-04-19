const fs = require('fs');
const faker = require('faker');

//run script using `node --max-old-space-size=4096 MongoDB-helper-functions.js`
//to seed the file, run `npm run seed`
const createRecordsFile = (value=10000000) => {
  let id=1;
  let writePath = (__dirname, `./MongoDB_records_1.csv`);
  let stream = fs.createWriteStream(writePath);
  stream.write(`id,username,body,score,prosconsReliability,prosconsDurability,prosconsLooks,performance,prosconsValue,likes,dislikes\n`)
  for (let i=1; i<=value; i++){
    stream.write(`"${i}","${faker.name.findName()}","${faker.lorem.sentence()}",${Math.floor(Math.random()*100)},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.floor(Math.random()*50)},${Math.floor(Math.random()*25)}\n`);
  }
  console.log(`done writing all files`);
};

createRecordsFile();