// const { Item } = require('./MongoDB-schema');
const fs = require('fs');

//run script using `node --max-old-space-size=4096 MongoDB-helper-functions.js`
//to seed the file, run `seed` from this directory
//this function was originally written to break data up between multiple files using the `breaks` argument
const createRecordsFile = (value=10000000, breaks=1) => {
  let id=1;
  for (let loop=1; loop<=breaks; loop++){
    for (let i=0; i<(value/breaks); i++, id++){
      let writePath = (__dirname, `./MongoDB_records_${loop}.csv`);
      let stream = fs.createWriteStream(writePath);
      stream.write(`username,body,score,prosconsReliability,prosconsDurability,prosconsLooks,performance,prosconsValue,likes,dislikes\n`)
      stream.write(`"${id}","Elvis Russell","Too many cooks spoil the broth.",3,1,0,1,0,1,30,2\n`);
    }
    console.log(`done writing to MongoDB_records${loop}_.json`);
  }
  console.log(`done writing all files`);
};

createRecordsFile();

const countLines = function(filePath, callback) {
  // function copied from http://stackoverflow.com/questions/12453057/node-js-count-the-number-of-lines-in-a-file
  // with very few modifications
  let i;
  let count = 0;
  fs.createReadStream('/Users/drewdistefano/Documents/code/dd-component/db/SDC/seeds/MongoDB_records_1.json')
      .on('error', e => callback(e))
      .on('data', chunk => {
          for (i=0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
      })
      .on('end', () => console.log(count));
};
// countLines()

// createRecordsFile();
// item.save().then((data) => console.log('data'));