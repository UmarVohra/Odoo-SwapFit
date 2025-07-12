const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/send-otp', authController.sendOtp);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
