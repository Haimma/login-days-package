const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const packagesController = require('../controllers/packages')

router.post('/add', checkAuth, packagesController.addPackages);

router.get('/get', checkAuth, packagesController.getPackages);

module.exports = router;
