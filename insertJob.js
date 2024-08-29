const mongoose = require('mongoose');
const Job = require('./models/job'); 

mongoose.connect('mongodb://localhost:27017/JobBoardDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Connected to MongoDB');


  try {
    // Assuming you already have a User with ObjectId 'userObjectId'
    const employerId = '66c278094a297cef3357e5c6'; 

    const newJob = new Job({
        title: 'FrontEnd Developer',
        description: 'Develop and maintain software applications.',
        location: 'New York, NY',
        salary: 120000,
        employer: new mongoose.Types.ObjectId(employerId), 
        requirements: [
          'Experience with JavaScript and TypeScript',
          'Knowledge of Node.js and Express',
          'Familiarity with MongoDB or other NoSQL databases',
          'Strong problem-solving skills'
        ],
        jobType: 'full-time', 
        createdAt: new Date(),
        updatedAt: new Date()
      });

    // Save the job to the database
    await newJob.save();
    console.log('Job created successfully:', newJob);
  } catch (err) {
    console.error('Error creating job:', err.message);
  } finally {
    mongoose.connection.close();
  }
});


