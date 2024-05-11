require('dotenv').config()
const { red, green, blue, magenta } = require('console-log-colors')
const express = require('express')
const cors = require('cors');
const cookies = require("cookie-parser");
const morgan = require('morgan')

const sequelize = require("./config/db")
const auth = require('./routes/auth.route')
const user = require('./routes/user.route')

const app = express()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined')) 
app.use(cookies());
app.use(cors());

app.use('/auth', auth)
app.use('/api/v1', user)


const PORT = process.env.PORT || 8080

;(async () => {
    try {
        await sequelize.authenticate()
        console.log(
            magenta('DB: Connection has been established successfully.')
        )
        // await sequelize.sync({ force: true })
        await sequelize.sync({ alter: true })

        console.log(magenta('DB: All models were synchronized successfully.'))
        // Listen on pc port
        app.listen(PORT, () =>
            console.log(blue(`Server running on PORT ${PORT}`))
        )
    } catch (error) {
        console.error(red('DB: Unable to connect to the database:', error))
    }
})()

// check server up
app.get('/', async (req, res) => {
    try {
        res.status(200).json({message:"Welcome!"})
    } catch (error) {
        // Handle any errors (e.g., validation errors, database errors)
        res.status(400).json({ error: error.message })
    }
})