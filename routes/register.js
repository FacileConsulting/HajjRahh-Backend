const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

// Route to save user data
router.post('/', registerController.registerUser);

module.exports = router;
