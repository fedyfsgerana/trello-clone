const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API Trello Clone berjalan!' })
})

module.exports = app