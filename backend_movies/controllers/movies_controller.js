const connection = require('../data/db')

function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })

}

module.exports = {
    index,
}