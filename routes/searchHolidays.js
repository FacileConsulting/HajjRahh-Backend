const express = require('express');
const router = express.Router();
const searchHolidaysController = require('../controllers/searchHolidays');

router.post('/', searchHolidaysController.searchPackages);

module.exports = router;
