const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccount');

router.post('/', myAccountController.myAccount);

module.exports = router;
