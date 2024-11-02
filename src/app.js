const express = require('express');
const bodyParser = require('body-parser');
const countriesRoutes = require('./routes/countriesRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/', express.static('src/public/views')); // Статическая папка для HTML
app.use('/api', countriesRoutes); // Префикс маршрутов API

module.exports = app;
