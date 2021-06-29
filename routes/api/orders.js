const express = require('express');
const router = express.Router();
const orderApi = require('../../controllers/api/orders_api');
router.post('/order/:id', orderApi.confirmOrder);
module.exports = router;