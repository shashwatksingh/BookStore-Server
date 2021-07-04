const express = require('express');
//Using cors to bypass all the CORS related problems on local host
let cors = require('cors');
const app = express();
app.use(cors());
//Using port as 3000
const port = process.env.PORT || 3000;
require('dotenv').config();
const env = require('./config/environment');
const db = require('./config/mongoose');
app.get('/', function (req, res) {
  res.send('Hello World');
});
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
//Routing and related middlewares
app.use('/', require('./routes'));
//Connecting to the port
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the Server :${err}`);
  }
  console.log(`Server running on port : ${port}`);
});
