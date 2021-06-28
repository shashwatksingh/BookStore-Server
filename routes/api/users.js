const express = require('express');
const router = express.Router();
const userApi = require('../../controllers/api/users_api');
router.post('/signin', userApi.signin);
router.post('/signup', userApi.signup);
module.exports = router;