const mongoose = require('mongoose');
const Application = require('./models/applications'); 
const Job = require('./models/job');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/jobBoardDB');



  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function() {
    console.log('Connected to MongoDB');
  
  
    try {
      // Assuming you already have a User with ObjectId 'userObjectId'
      const applicantId = '66b34400ddb3bca3d8019868'; 
      const jobId = '66b3414d0df3e6cb816526f9';
  
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
  
  
