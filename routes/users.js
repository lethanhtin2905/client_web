var express = require('express');
var router = express.Router();
var accountControllers = require('../controllers/account-controllers');
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

module.exports = router;
