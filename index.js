const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');

// import router
const authRoute = require('./routes/auth');
const testRoute = require('./routes/testRoute');
//MiddleWare
app.use(express.json());
app.use(cookieParser());
//router prefix
app.use('/api/user', authRoute);
app.use('/api/test', testRoute);
// hide our connection string
dotenv.config();
//Connect to DB
mongoose.connect(process.env.url, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log('Connected')
);

app.listen(3000, () => console.log('Server Up and running'));
