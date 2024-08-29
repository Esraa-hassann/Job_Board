const mongoose = require('mongoose');
const Application = require('./models/applications'); 
const Job = require('./models/job');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/JobBoardDB');



  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function() {
    console.log('Connected to MongoDB');
  
  
    try {
      // Assuming you already have a User with ObjectId 'userObjectId'
      const applicantId = '66c276c4c53c791136db6756'; 
      const jobId = '66c332f2fd32b8a3629948ee';
  
      const newApplication = new Application({
         applicant : new mongoose.Types.ObjectId(applicantId),
          job : new mongoose.Types.ObjectId(jobId),
          resume : "http://example.com/resume/janadoe.pdf",
          status :'pending',
          appliedAt: new Date(),
         
        });
  
      // Save the job to the database
      await newApplication.save();
      console.log('Job created successfully:', newApplication);
    } catch (err) {
      console.error('Error creating job:', err.message);
    } finally {
      mongoose.connection.close();
    }
  });
  
  
