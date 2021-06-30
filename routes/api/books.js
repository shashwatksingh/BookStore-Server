const express = require('express');
const router = express.Router();
const bookApi = require('../../controllers/api/books_api');
router.get('/', bookApi.index);
router.get('/search', bookApi.search);
router.get('/details/:id', bookApi.details);
module.exports = router;
