const express = require('express');
const router = express.Router();
const searchAirportController = require('../controllers/searchAirport');

router.post('/', searchAirportController.searchAirport);

module.exports = router;
