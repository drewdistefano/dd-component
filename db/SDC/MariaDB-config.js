const mariadb = require('mariadb');
const pool = mariadb.createPool({
  user: 'root',
  database: 'component',
  // connectionLimit = 200
});

pool.getConnection()
.then((connection)=>{ module.exports = { connection }})

console.log('MariaDB pool created!')

module.exports = { pool };