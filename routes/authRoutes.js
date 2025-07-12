const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');

router.post('/send-otp', authController.sendOtp);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/home', homeController.renderHomepage);

module.exports = router;
