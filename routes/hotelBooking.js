const express = require('express');
const router = express.Router();
const hotelBookingController = require('../controllers/hotelBooking');

router.post('/', hotelBookingController.checkHotelBooking);

module.exports = router;
