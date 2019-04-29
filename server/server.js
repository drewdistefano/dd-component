const nr = require ('newrelic')
const env = require('dotenv').config();
const app = require('./10M-server-app.js')
const port = process.env.port || 4000;


app.listen(port, (err, success) => {
  if (err) console.log('Server run error')
  else console.log(`Server running on port: ${port}`)
})