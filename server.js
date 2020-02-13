const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config')

app.use(bodyParser.json());

//Import Routes
const getRouter = require('./routes/Get');

app.use('/get', getRouter);

//Listening to the server
app.listen(3000);