const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const uploadRoutes = require ('./routes/uploadRoutes');

const app = express();
const port = process.env.PORT || 3000;

// file upload handling 

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// DB connection
mongoose.connect('mongodb://localhost:27017/JobBoardDB', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api', uploadRoutes);

// // file upload
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));



// Catch-all route to serve the frontend application's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'PROJECT/Job_Board/src/index.html')); 
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
