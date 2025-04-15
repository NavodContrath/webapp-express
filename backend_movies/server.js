const express = require('express')
const cors = require('cors')
const serverError = require('./middlewares/server_error')
const notFound = require('./middlewares/not_found')
const moviesRouter = require('./routers/movies')
const app = express()
const PORT = process.env.PORT || 3000

//middlewares
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173'
    }
))
//use to pars in json
app.use(express.json())
//use to show static elements
app.use(express.static('public'))
//use to litsen to our port
app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`)
})
//api request
app.get('/', (req, res) => {
    res.send('Movies api')
})
//using router
app.use('/api/v1/movies', moviesRouter)
//error handlers
//500
app.use(serverError)
//404
app.use(notFound)