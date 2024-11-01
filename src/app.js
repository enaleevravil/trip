// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tripsController = require('./controllers/tripsController'); // Импортируем контроллер

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Для обработки данных формы
app.use(express.static('public')); // Для раздачи статических файлов

// Главная страница (форма добавления поездки)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/addTrip.html')); // Отправляем HTML-форму
});

// Маршрут для добавления новой поездки
app.post('/trips', tripsController.addTrip);

// Маршрут для просмотра всех поездок
app.get('/trips', tripsController.getTripsPage);
app.get('/trips/data', tripsController.getAllTrips);

module.exports = app; // Экспортируем приложение
