const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/', loginController.checkLoginUser);

module.exports = router;
