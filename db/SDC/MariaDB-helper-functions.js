const fs = require('fs');
const path = require('path')
// const { pool } = require('./MariaDB-config.js');
// const faker = require("faker");
const { conn } = require('./MariaDB-config.js');

//Gets reviews based on product id
const getReviewsById = (productId, callback) => {
  conn.query(`SELECT * FROM records WHERE product_id = ${productId}`, (err, data)=>{
    if (err){
      console.log('unable to query MariaDB')
      callback(err)
    }
    else {
      console.log('data retrieved from MariaDB!')
      callback(null, data)
    }
  })
}

//Using promises:
//Gets reviews based on product id
// const getReviewsById = (productId, callback) => {
//   console.log('...connecting to MariaDB...')
//   pool.getConnection()
//   .then((connection)=>{
//     let startTime = new Date();
//     console.log(`connected to MariaDB!, searching for productId ${productId}`)
//     connection.query(`SELECT * FROM records WHERE product_id = ${productId}`)
//     .then((data)=>{
//       console.log('data retrieved from MariaDB!')
//       console.log(`query time: ${new Date() - startTime} ms`)
//       callback(null, data)
//     })
//     .catch((err)=>{
//       callback(err)
//     })
//   })
//   .catch((err)=>{
//     callback(err)
//   })
// }

module.exports = { getReviewsById };