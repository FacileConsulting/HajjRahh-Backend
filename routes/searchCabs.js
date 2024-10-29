const express = require('express');
const router = express.Router();
const searchCabsController = require('../controllers/searchCabs');

router.post('/', searchCabsController.searchCabs);

module.exports = router;
