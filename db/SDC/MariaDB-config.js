const mariadb = require('mariadb');
const pool = mariadb.createPool({
  user: 'root',
  database: 'component',
  // connectionLimit = 200
});

console.log('MariaDB pool created!')

module.exports = { pool };