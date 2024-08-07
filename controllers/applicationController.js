const Application = require('../models/application');

exports.createApplication = async (req, res) => {
    const newApplication = new Application(req.body);
    try {
        const application = await newApplication.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
        if (!application) return res.status(404).json({ message: 'Application not found' });
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
