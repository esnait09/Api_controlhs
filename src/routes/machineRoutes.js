const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');

router.post('/machines', machineController.submitMachine);

module.exports = router;