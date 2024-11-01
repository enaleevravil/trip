// src/server.js
const app = require('./app');
const client = require('./config/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Закрытие соединения с базой данных при завершении работы приложения
process.on('SIGINT', async () => {
    console.log('Закрытие соединения с базой данных...');
    await client.end();
    console.log('Соединение закрыто. Выход из приложения.');
    process.exit(0);
});

