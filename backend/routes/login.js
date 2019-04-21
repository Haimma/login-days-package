const express = require("express");

const router = express.Router();

const loginController = require('../controllers/login')
router.post('/signup', loginController.creatUser);

router.post('/login', loginController.loginUser);

module.exports = router;
