const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const env = require('./config/environment');
const db = require('./config/mongoose');
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the Server :${err}`);
  }
  console.log(`Server running on port : ${port}`);
});
