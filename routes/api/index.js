const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();

router.use('/books', require('./books'));
module.exports = router;