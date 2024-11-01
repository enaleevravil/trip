const { Client } = require('pg');

// Настройки подключения
const client = new Client({
    user: 'postgres', // имя пользователя
    host: 'localhost',
    database: 'travel_planner', // имя базы данных
    password: '123123', // пароль пользователя
    port: 5432, // стандартный порт PostgreSQL
});

// Подключение к базе данных
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Экспорт клиента для использования в других частях приложения
module.exports = client;