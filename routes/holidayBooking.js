const express = require('express');
const router = express.Router();
const holidayBookingController = require('../controllers/holidayBooking');

router.post('/', holidayBookingController.checkHolidayBooking);

module.exports = router;
