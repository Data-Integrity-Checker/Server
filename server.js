// Express
const express = require('express');
const app = express();

// Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import Routes
const getRouter = require('./routes/get');
const postRouter = require('./routes/post');
app.use('/get', getRouter);
app.use('/post', postRouter);

// Connect to Database
var mongodb = require('mongodb').MongoClient;
mongodb.connect("mongodb://localhost:27017/Data-Integrity-Cherker", { useUnifiedTopology: true }, function(err, db) {
  if(err) 
        console.log("We are not connected");
  else
        console.log("We are connected");
});

// Listening to the server
app.listen(3000);
