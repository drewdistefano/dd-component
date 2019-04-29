const mariadb = require('mariadb');
console.log('creating pool...')

const pool = mariadb.createPool({
  host: process.env.MARIA_HOST,
  user: 'app',
  password: process.env.MARIA_PASSWORD,
  database: 'component',
  port: process.env.MARIA_PORT
});

let conn = pool.getConnection;

module.exports = { pool };