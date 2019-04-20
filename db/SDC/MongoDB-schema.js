require('./MongoDB-config');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/component', { useNewUrlParser: true });

const Item = mongoose.model('items', { 
  id: Number,
  username: String,
  body: String,
  score: Number,
  prosconsReliability: Number,
  prosconsDurability: Number,
  prosconsLooks: Number,
  performance: Number,
  prosconsValue: Number,
  likes: Number,
  dislikes: Number,
});

module.exports = { Item };