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
    const reviewSql = 'SELECT reviews.name,reviews.text,reviews.vote FROM reviews WHERE movie_id=?'
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
function storeReview(req, res) {
    //take id from request
    const id = Number(req.params.id)
    //define and destructure data from req.bdy
    const { name, vote, text } = req.body
    //create DATETIME
    const created_at = new Date().toISOString().slice(0, 19).replace('T' + ' ')
    const updated_at = created_at
    //sql query used to insert a new review using values const
    const insertSql = 'INSERT INTO reviews (movie_id,name,vote,text,created_at,updated_at) VALUES (?,?,?,?,?,?)'
    const values = [id, name, vote, text, created_at, updated_at]
    //execute query 
    connection.query(insertSql, values, (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Review saved with success!', data: values })
    })
}
function destroyReview(req, res) {
    const id = Number(req.params.id)
    const sql = 'DELETE FROM reviews WHERE id=?'
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.sendStatus(204)
    })
}
module.exports = {
    index,
    show,
    storeReview,
    destroyReview
}