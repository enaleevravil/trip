const express = require('express');
const { getAllCountries, addVisitedCountry, getCountryList, deleteCountry } = require('../controllers/countriesController');
const router = express.Router();

router.get('/countries', getAllCountries);
router.post('/countries', addVisitedCountry);
router.get('/country-list', getCountryList); // Новый маршрут для получения списка стран

module.exports = router;

