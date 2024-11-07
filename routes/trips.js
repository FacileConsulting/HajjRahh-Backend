const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router.post('/', tripsController.trips);

module.exports = router;
