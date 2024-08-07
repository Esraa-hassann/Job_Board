const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = process.env.port || 3000;

//middleware
app.use(bodyParser.json());

//Db connection

mongoose.connect('mongodb://localhost:27017/jobBoardDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


