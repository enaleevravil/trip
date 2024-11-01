// src/routes/tripsRoutes.js
const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');

router.get('/', tripsController.getAllTrips);
router.post('/add', tripsController.addTrip);

module.exports = router;