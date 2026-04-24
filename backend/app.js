const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/swagger')
require('dotenv').config()

const authRoutes = require('./src/routes/auth.routes')
const boardRoutes = require('./src/routes/board.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'API Trello Clone berjalan!' })
})

module.exports = app