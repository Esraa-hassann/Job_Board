const mongoose = require('mongoose');
const User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/JobBoardDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log('Connected to MongoDB');


  const newUser = new User({
    password: "123456", 
    email: "atmoharm@example.com",
    role: "employer",
    profile: {
      firstName: "Ahmad",
      lastName: "Doe",
      bio: "Experienced software developer.",
      resume: "http://example.com/resume/janadoe.pdf",
      age : 22,
      contactNumber: "01212199610",
      companyName: "Flex tech",
      companyWebsite: "https://stackoverflow.com/questions/44499425/how-to-use-formcontrolname-and-deal-with-nested-formgroup"
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
