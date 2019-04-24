// require('./MongoDB-config');
const mongoose = require('mongoose');
const coll = mongoose.connect('mongodb://localhost:27017/component', { useNewUrlParser: true }, (err, data)=>{
  if (err){
    console.log('MongoDB connect error: ', err)
  }
  else console.log("MongoDB connect success!")
});

const reviewSchema = mongoose.Schema({ 
  review_id: Number,
  product_id: Number,
  username: String,
  body: String,
  score: Number,
  prosconsReliability: Number,
  prosconsDurability: Number,
  prosconsLooks: Number,
  performance: Number,
  prosconsValue: Number,
  likes: Number,
  dislikes: Number
});

const Reviews = mongoose.model("reviews", reviewSchema);

const getReviewsById = (productId, callback) => {
  Reviews.find({product_id: productId})
  .lean().exec((err, data)=>{
    if (err){
      console.log(`Error! Unable to get reviews for product_id ${productId}`);
      callback(err);
    }
    else {
      console.log('data: ', data)
      callback(null, data);
    }
  })
};

module.exports = { getReviewsById };