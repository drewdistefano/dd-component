const { conn } = require('./MongoDB-config');

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
      console.log('MongoDB: getReviewsById success!')
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