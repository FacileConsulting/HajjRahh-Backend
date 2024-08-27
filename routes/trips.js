const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route to save user data
router.post('/', tripsController.trips);

module.exports = router;
