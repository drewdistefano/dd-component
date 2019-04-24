const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/db.js');
const fs = require('file-system');
const path = require('path');
const app = express();
const axios = require('axios');
app.use(express.static('dist'));
app.use(bodyParser.json({urlEncoded: false}));
app.use(cors());

// // Jay - For client 
// app.post('/api/getreviews', (req, res) => {
//   console.log('route getreviews started');
//   console.log('req.body.productId:', req.body.productId);
//   db.getReviewsById(req.body.productId, (err, success) => {
//     if (err) {
//       console.log('Server: db getReview error')
//       res.end();
//     } else {
//       console.log('Server: db getReview success');
//       res.status(201).send(success);
//     }
//   });
// });

// For db seeding original
app.post('/api/reviews', (req, res) => {
  console.log('app.post started');
  for (let x = 0; x < req.body.length; x++) {
    console.log('req.body[x]:', req.body[x]);
    db.postReview(req.body[x], (err, success) => {
      if (err) {
        console.log('Server: db postReview error')
        res.end();
      } else {
        console.log('Server: db postReview success');
        res.end('success');
      }
    });
  }
});

// For db seeding with JB's data
app.get('/api/jbsreviews', (req, res) => {
  fs.readFile(path.join(__dirname, "../db/jbdata.json"), (error, data) => {
    if (error) {
      console.error(error)
    } else {
      data = JSON.parse(data);
      data.map((review, index) => {
        db.postReview(review, (err, result) => {
          if (err) {
            console.error('jb data write error:', err);
          } else {
            console.log("jb data write success", index);
          }
        })
      })
    }
  })
})

// For db merging
app.get('/api/allreviews', (req, res) => {
  db.getAllReviews((err, data) => {
    if (err) {
      console.log('app.get all reviews error')
    } else {
      console.log('app.get all reviews success')
      res.send(data)
    }
  })
})

module.exports = app;