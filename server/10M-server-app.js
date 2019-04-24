const currentDB = "MongoDB"
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getReviewsById } = require('../db/SDC/MariaDB-helper-functions.js')
// const { getReviewsById } = require('../db/SDC/MongoDB-helper-functions.js')
const path = require('path');
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json({urlEncoded: false}));
app.use(cors());

// Drew - Get review by product's id
app.get('/api/getreviews', (req, res) => {
  let productId = req.query.productId;
  getReviewsById(productId, (err, data) => {
    if (err) {
      console.log('Server: unable to get review by id: ', err)
      res.end();
    }
    console.log('app.get all reviews success')
    for (let review of data){
      review.proscons = {};
      review.proscons.value = review.prosconsValue === 1 ? true : false;
      review.prosconsValue = undefined;
      review.proscons.reliability = review.prosconsReliability === 1 ? true : false;
      review.prosconsReliability = undefined;
      review.proscons.performance = review.prosconsPerformance === 1 ? true : false;
      review.prosconsPerformance = undefined;
      review.proscons.looks = review.prosconsLooks === 1 ? true : false;
      review.prosconsLooks = undefined;
      review.proscons.durability = review.prosconsDurability === 1 ? true : false;
      review.prosconsDurability = undefined;
    }
    res.status(201).send(data);
  })
})

module.exports = app;