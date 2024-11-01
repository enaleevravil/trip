// src/controllers/tripsController.js
const client = require('../config/db');

exports.addTrip = async (req, res) => {
    const { from_location, to_location, travel_date, transport } = req.body;

    try {
        await client.query(
            'INSERT INTO trips (from_location, to_location, travel_date, transport) VALUES ($1, $2, $3, $4)',
            [from_location, to_location, travel_date, transport]
        );
        res.send('Поездка добавлена!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при добавлении поездки');
    }
};

exports.getAllTrips = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM trips');
        const trips = result.rows;
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
};
