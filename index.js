const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// import router
const authRoute = require('./routes/auth')
//MiddleWare
app.use(express.json())
//router prefix
app.use('/api/user', authRoute)
// hide our connection string
dotenv.config()
//Connect to DB
mongoose.connect(process.env.url, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log('Connected')
)

app.listen(3000, () => console.log('Server Up and running'))
