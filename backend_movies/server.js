const express = require('express')
const cors = require('cors')
const serverError = require('./middlewares/server_error')
const notFound = require('./middlewares/not_found')
const app = express()
const PORT = process.env.PORT || 3000

//middlewares
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173'
    }
))

app.use(express.json())

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`)
})
app.get('/', (req, res) => {
    res.send('Movies api')
})


app.use(serverError)

app.use(notFound)