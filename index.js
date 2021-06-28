const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const env = require('./config/environment');
const db = require('./config/mongoose');
app.get('/', function (req, res) {
  res.send('Hello World');
});
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/', require('./routes'));
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the Server :${err}`);
  }
  console.log(`Server running on port : ${port}`);
});
