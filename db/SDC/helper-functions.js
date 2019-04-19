const { conn } = require('./db-config.js');

const seed = (value=2) => {
  let startTime = new Date();
  conn()
  .then((connection)=>{
    connection.query('DELETE FROM records;');
    while (value > 0){
      console.log('looping!')
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

seed();

module.exports = { seed };