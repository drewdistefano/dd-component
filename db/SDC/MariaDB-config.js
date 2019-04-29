const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({
  host: process.env.MARIA_HOST,
  user: 'app',
  password: process.env.MARIA_PASSWORD,
  database: 'component',
  port: process.env.MARIA_PORT
});

conn.connect((err)=>{
  if (err){
    console.log('Unable to connect to MariaDB')
  }
  else {
    console.log('Connected to MariaDB!')
  }
})

module.exports = { conn };

//USING A POOL/PROMISES
// const mariadb = require('mariadb');
// console.log('creating pool...')

// const pool = mariadb.createPool({
//   host: process.env.MARIA_HOST,
//   user: 'app',
//   password: process.env.MARIA_PASSWORD,
//   database: 'component',
//   port: process.env.MARIA_PORT
// });

// module.exports = { pool };