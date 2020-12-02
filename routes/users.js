var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');

// Register Page
router.get('/register', accountControllers.registerPage);

// Login Page
router.get('/login', accountControllers.loginPage);

module.exports = router;
