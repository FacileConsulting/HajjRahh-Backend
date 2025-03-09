const express = require('express');
const router = express.Router();
const searchHotelsController = require('../controllers/searchHotels');

router.post('/', searchHotelsController.searchHotels);

module.exports = router;