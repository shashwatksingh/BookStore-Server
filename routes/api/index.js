const express = require('express');
//fetching the existing instance of express in above line
const router = express.Router();

router.use('/books', require('./books'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
module.exports = router;