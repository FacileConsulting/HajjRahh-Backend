const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccount');

// Route to check all user login data
router.post('/', myAccountController.myAccount);

module.exports = router;
