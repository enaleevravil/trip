// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tripsRoutes = require('./routes/tripsRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Главная страница с формой
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Подключение маршрутов
app.use('/trips', tripsRoutes);

module.exports = app;