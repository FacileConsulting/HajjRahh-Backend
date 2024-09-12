const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshToken');

// Route to check all user login data
router.post('/', refreshTokenController.getRefreshToken);

module.exports = router;
