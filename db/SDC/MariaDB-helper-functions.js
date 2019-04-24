const fs = require('fs');
const path = require('path')
const { pool } = require('./MariaDB-config.js');
const faker = require("faker");

//Gets reviews based on product id
const getReviewsById = (productId, callback) => {
  pool.getConnection()
  .then((connection)=>{
    let startTime = new Date();
    console.log(`connected to MariaDB!, searching for productId ${productId}`)
    connection.query(`SELECT * FROM records WHERE product_id = ${productId}`)
    .then((data)=>{
      console.log('data retrieved from MariaDB!')
      console.log(`query time: ${new Date() - startTime} ms`)
      callback(null, data)
    })
    .catch((err)=>{
      callback(err)
    })
  })
  .catch((err)=>{
    callback(err)
  })
}

module.exports = { getReviewsById };