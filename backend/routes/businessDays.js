const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const businessDaysController = require('../controllers/businessDays')

router.post('/add', checkAuth, businessDaysController.addBD);


router.get('/get', checkAuth, businessDaysController.getBD);

module.exports = router;
