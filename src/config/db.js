// src/config/db.js
const { Client } = require('pg');
require('dotenv').config(); // Загружаем переменные окружения из .env

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'travel_planner',
    password: process.env.DB_PASSWORD || '123123', // Используйте переменную окружения
    port: process.env.DB_PORT || 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;