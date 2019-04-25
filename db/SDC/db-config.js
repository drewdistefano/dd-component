const mariadb = require('mariadb');
console.log('mariahost>>>', process.env.MARIA_HOST)
const pool = mariadb.createPool({
  host: process.env.MARIA_HOST,
  user: 'app',
  password: 'password',
  database: 'component',
  port: process.env.MARIA_PORT
  // connectionLimit = 200
});

let conn = pool.getConnection;

module.exports = { conn };