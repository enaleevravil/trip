const client = require('../config/db');
const path = require('path');

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

exports.getTripsPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/tripsList.html'));
};

exports.getAllTrips = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM trips');
        const trips = result.rows;
        res.json(trips);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при получении поездок');
    }
};