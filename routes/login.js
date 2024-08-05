const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

// Route to check all user login data
router.post('/', loginController.checkLoginUser);

module.exports = router;
