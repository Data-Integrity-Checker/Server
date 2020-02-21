const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const devicesRouter = require('./routes/devices');
app.use('/devices', devicesRouter);

// Clear Database
mongoose.connection.collections['devices'].drop( function(err) {
      console.log('Devices collection dropped');
});

// Connect to Database
mongoose.connect(
      "mongodb://localhost:27017/Data-Integrity-Checker",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
      },
      () => console.log('Connected To Database')
);

// Listening to the server
app.listen(3000);
