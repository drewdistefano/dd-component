const mariadb = require('mariadb');
console.log('creating pool...')
console.log('MARIA_HOST>>>', process.env.MARIA_HOST)
const pool = mariadb.createPool({
  host: process.env.MARIA_HOST,
  user: 'app',
  password: process.env.MARIA_PASSWORD,
  database: 'component',
  port: process.env.MARIA_PORT
  // connectionLimit = 200
});

let conn = pool.getConnection;

module.exports = { pool };