const express = require('express');
const router = express.Router();
const searchFlightsController = require('../controllers/searchFlights');

router.post('/', searchFlightsController.searchFlights);

module.exports = router;
