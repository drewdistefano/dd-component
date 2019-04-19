const mariadb = require('mariadb');
const pool = mariadb.createPool({
  user: 'root',
  database: 'component',
  // connectionLimit = 200
});

let conn = pool.getConnection;

module.exports = { conn };