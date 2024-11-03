const client = require('../config/db');

exports.getAllCountries = async (req, res) => {
    try {
        const result = await client.query(`
            SELECT visited_countries.id, countries.name AS country_name, visit_date, end_date, city 
            FROM visited_countries 
            JOIN countries ON visited_countries.country_id = countries.id 
            ORDER BY visit_date DESC
            `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при получении данных');
    }
};

exports.addVisitedCountry = async (req, res) => {
    const { country_id, visit_date, end_date, city } = req.body;

    try {
        await client.query(
            'INSERT INTO visited_countries (country_id, visit_date, end_date, city) VALUES ($1, $2, $3, $4)',
            [country_id, visit_date, end_date, city]
        );
        res.send('Посещение добавлено!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при добавлении посещения');
    }
};

// Получить список стран из таблицы countries
exports.getCountryList = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM countries');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при получении списка стран');
    }
};

// Функция для удаления поездки по ее id
exports.deleteVisitedCountry = async (req, res) => {
    const { id } = req.params; // Получаем id из параметров URL

    try {
        // Выполняем запрос на удаление поездки из таблицы visited_countries по id
        const result = await client.query('DELETE FROM visited_countries WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            // Если не удалось найти запись для удаления
            res.status(404).send('Поездка не найдена');
        } else {
            res.send('Поездка успешно удалена');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при удалении поездки');
    }
};