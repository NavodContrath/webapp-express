const mysql = require('mysql2')

const credentials = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
}

const connection = mysql.createConnection(credentials)

connection.connect((err) => {
    if (err) throw new err
    console.log("db connected")
})
module.exports = connection