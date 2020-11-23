const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// hide our connection string
dotenv.config()

//Connect to DB
mongoose.connect(process.env.url, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected'))

// import router
const authRoute = require('./routes/auth')

//router prefix
app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Server Up and running'))
