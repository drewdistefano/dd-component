const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/component', { useNewUrlParser: true }, (err, connection)=>{
  if (err){
    console.log('Error connection got MongoDB: ', err)
  }
  else {
    console.log('Connected to MongoDB!')
  }
});