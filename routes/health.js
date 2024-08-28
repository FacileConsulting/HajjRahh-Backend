const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health');

// Route to check all user login data
router.get('/', healthController.checkHealth);

module.exports = router;
