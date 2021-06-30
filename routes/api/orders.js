const express = require('express');
const router = express.Router();
const orderApi = require('../../controllers/api/orders_api');
const auth = require('../../middleware/auth');
router.post('/:id', auth, orderApi.confirmOrder);
module.exports = router;