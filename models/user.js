const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['jobSeeker', 'employer'], required: true },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: {type: Number, required:true} ,
    bio: { type: String},
    resume: { type: String, required: true },
    contactNumber: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
  

  const User = mongoose.model('User', userSchema);
  
  module.exports = User; 