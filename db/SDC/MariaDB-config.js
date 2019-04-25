const mariadb = require('mariadb');
console.log(process.env.MARIA_HOST)
const pool = mariadb.createPool({
  host: process.env.MARIA_HOST,
  user: 'root',
  database: 'component',
  // connectionLimit = 200
});

// //attempt to export connection
// pool.getConnection()
// .then((connection)=>{ module.exports = { connection }})

module.exports = { pool };