const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.apiAdminLogin);
router.post('/signup', authController.apiAdminSignup);

module.exports = router;