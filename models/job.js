
const mongoose = require('mongoose');



const jobSchema =new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  salary: { type: Number },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  requirements : [{type:String}],
  jobType : {
    type : String,
    enum : ['full-time', 'part-time', 'internship'],
    required : true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 
