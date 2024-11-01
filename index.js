const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg'); // импортируем pg
const path = require('path'); // для работы с путями

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'travel_planner',
    password: '123123', // Замените на свой пароль
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Для обработки данных формы
app.use(express.static('public')); // Чтобы можно было раздавать статические файлы (например, HTML)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Отправляем HTML-форму
});

// Маршрут для добавления новой поездки
app.post('/trips', async (req, res) => {
    const { from_location, to_location, travel_date, transport } = req.body;

    try {
        await client.query('INSERT INTO trips (from_location, to_location, travel_date, transport) VALUES ($1, $2, $3, $4)', [from_location, to_location, travel_date, transport]);
        res.send('Поездка добавлена!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при добавлении поездки');
    }
});

// Маршрут для просмотра всех поездок
app.get('/trips', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM trips'); // Получаем все записи из таблицы trips
        const trips = result.rows; // Извлекаем строки из результата
        res.send(`
            <h1>Список всех поездок</h1>
            <ul>
                ${trips.map(trip => `
                    <li>
                        <strong>ID:</strong> ${trip.id} <br>
                        <strong>Откуда:</strong> ${trip.from_location} <br>
                        <strong>Куда:</strong> ${trip.to_location} <br>
                        <strong>Дата поездки:</strong> ${trip.travel_date} <br>
                        <strong>Транспорт:</strong> ${trip.transport} <br>
                    </li>
                `).join('')}
            </ul>
            <a href="/">Назад к форме добавления поездки</a>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при получении поездок');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Закрытие соединения с БД
process.on('SIGINT', async () => {
    console.log('Закрытие соединения с базой данных...');
    await client.end(); // Закрываем соединение
    console.log('Соединение закрыто. Выход из приложения.');
    process.exit(0); // Завершаем приложение
});