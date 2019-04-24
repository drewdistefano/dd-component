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
  let startTime = new Date()
  Reviews.find({product_id: productId})
  .lean().exec((err, data)=>{
    if (err){
      console.log(`Error! Unable to get reviews for product_id ${productId}`);
      callback(err);
    }
    else {
      console.log('data: ', data)
      console.log(`query time: ${new Date() - startTime} ms`)
      callback(null, data);
    }
  })
};

//queries database by review_id, for use in testing speed of single row query (versus multiple row)
// const test = (review_id, callback) => {
//   Reviews.find({_id: review_id})
//   .limit(1).exec((err, data)=>{
//     if (err){
//       console.log(`Error! Unable to get reviews for product_id ${productId}`);
//       callback(err);
//     }
//     else {
//       console.log('data: ', data)
//       callback(null, data);
//     }
//   })
// };

module.exports = { getReviewsById };