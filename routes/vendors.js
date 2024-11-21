const express = require('express');
const router = express.Router();
const vendorsController = require('../controllers/vendors');

router.post('/', vendorsController.vendors);

module.exports = router;
