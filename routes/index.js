var express = require('express');
var router = express.Router();
var homeControllers = require('../controllers/home-controllers');
var productControllers = require('../controllers/product-controllers');

/* GET home page. */
router.get('/', homeControllers.index);

// Store
router.get('/store', productControllers.displayProducts);

// Product Information
router.get('/product/:id', productControllers.productInfo);

module.exports = router;
