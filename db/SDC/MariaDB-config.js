const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: process.env.MARIA_HOST,
  user: 'app',
  password: process.env.MARIA_PASSWORD,
  database: 'component',
  // connectionLimit = 200
});

// //attempt to export connection
// pool.getConnection()
// .then((connection)=>{ module.exports = { connection }})

module.exports = { pool };