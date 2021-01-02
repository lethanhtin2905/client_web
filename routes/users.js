var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');
var orderControllers = require('../controllers/order-controllers');
const { ensureAuthenticated } = require('../config/auth');

// Register Page
router.get('/register', accountControllers.registerPage);

// Login Page
router.get('/login', accountControllers.loginPage);

// Profile
router.get('/profile', ensureAuthenticated, accountControllers.profile);

// Register Handle
router.post('/register', accountControllers.registerHandle);

// Activate Account Page
router.get('/activate/:id', accountControllers.activatePage);

// Login Handle
router.post('/login', accountControllers.loginHandle);

// Update Profile
router.post('/update-profile', accountControllers.updateProfile);

// Order Management
router.get('/order-management', ensureAuthenticated, orderControllers.orderManagement);

// Checkout Page
router.get('/checkout', ensureAuthenticated, accountControllers.checkoutPage);

// Checkout Handle
router.post('/checkout', orderControllers.checkoutHandle);

// Track Order
router.get('/track-order/:id', ensureAuthenticated, orderControllers.trackOrder);

module.exports = router;
