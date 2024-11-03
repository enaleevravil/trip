const express = require('express');
const { getAllCountries, addVisitedCountry, getCountryList, deleteVisitedCountry } = require('../controllers/countriesController');
const router = express.Router();

router.get('/countries', getAllCountries);
router.post('/countries', addVisitedCountry);
router.get('/country-list', getCountryList); // Новый маршрут для получения списка стран
router.delete('/countries/:id', deleteVisitedCountry); // Маршрут для удаления поездки по id

module.exports = router;

