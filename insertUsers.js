const mongoose = require('mongoose');
const User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/jobBoardDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Connected to MongoDB');


  const newUser = new User({
    username: "Jana",
    password: "hashedpassword", 
    email: "Janadoe@example.com",
    role: "jobSeeker",
    profile: {
      firstName: "Jana",
      lastName: "Doe",
      bio: "Experienced software developer.",
      resume: "http://example.com/resume/janadoe.pdf",
      age : 21,
      contactNumber: "01212199610"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  });

  try {
    await newUser.save();
    console.log('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err.message);
  } finally {
    mongoose.connection.close();
  }
});
