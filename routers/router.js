const express = require('express');
const { getAllProducts } = require('../controllers/shop_controller/products');
const router = express.Router();


router.get('/', getAllProducts);


module.exports = router;