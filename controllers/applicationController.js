const Application = require('../models/applications');
const User = require('../models/user');

// Create Application
exports.createApplication = async (req, res) => {
    try {
      const { resume, status, job, applicant } = req.body;
  
      
      const applicantUser = await User.findById(applicant);
  
      if (!applicantUser) {
        return res.status(404).json({ error: 'Applicant not found' });
      }
  
      
      if (applicantUser.userType === 'job_seeker' && !resume) {
        return res.status(400).json({ error: 'Job seekers must upload a resume.' });
      }
  
      if (applicantUser.userType === 'employer' && resume) {
        return res.status(400).json({ error: 'Employers should not upload a resume.' });
      }
  
      const newApplication = new Application({ resume, status, job, applicant });
      await newApplication.save();
  
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('job applicant');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('job applicant');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
