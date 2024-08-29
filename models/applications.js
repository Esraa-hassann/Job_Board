const mongoose = require('mongoose');

//Define Schema
const applicationSchema = new mongoose.Schema({
    resume : {type:String , required:true},
    status : {
        type : String , 
        enum : ['Applied' ,'pending', 'Accepted', 'rejected'],
        default:'pending'
    },
    job : {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required:true},
    applicant : {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    appliedAt: { type: Date, default: Date.now }

})

// Middleware to enforce conditional validation
applicationSchema.pre('validate', async function (next) {
    try {
      const applicant = await mongoose.model('User').findById(this.applicant);
  
      if (applicant.userType === 'job_seeker' && !this.resume) {
        throw new Error('Job seekers must upload a resume.');
      }
  
      if (applicant.userType === 'employer' && this.resume) {
        throw new Error('Employers should not upload a resume.');
      }
  
      next();
    } catch (error) {
      next(error);
    }
  });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application; 