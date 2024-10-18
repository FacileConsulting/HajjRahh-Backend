const express = require('express');
const router = express.Router();
const holidayBookingController = require('../controllers/holidayBooking');

// Route to check all user login data
router.post('/', holidayBookingController.checkHolidayBooking);

module.exports = router;
