const connection = require('../data/db')

function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
}

function show(req, res) {
    //take id from request
    const id = Number(req.params.id)
    //define sql query to get movie with specific id
    const sql = 'SELECT * FROM movies WHERE id=?'
    //define sql query to get reviews with specific id
    const reviewSql = 'SELECT reviews.name,reviews.text,reviews.vote FROM reviews WHERE id=?'
    //execute movie's query
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ error: 'movie not found' })
        const movie = results[0]
        //execute review's query
        connection.query(reviewSql, [id], (err, review) => {
            if (err) return res.status(500).json({ erro: err.message })
            //add review to movie object with DOT notation
            movie.reviews = review
            res.json(movie)
        })

    })
}

module.exports = {
    index,
    show
}