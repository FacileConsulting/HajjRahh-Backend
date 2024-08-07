const express = require('express');
const router = express.Router();
const searchHolidaysController = require('../controllers/searchHolidays');

// Route to save user data
router.post('/', searchHolidaysController.searchPackages);

module.exports = router;
