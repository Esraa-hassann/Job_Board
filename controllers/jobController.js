const Job = require('../models/job');
const mongoose = require('mongoose');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const { jobTitle, description, location, salary, jobType, requirements, employerId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(employerId)) {
            return res.status(400).json({ message: 'Invalid Employer ID' });
        }

        const newJob = new Job({
            jobTitle,
            description,
            location,
            salary,
            jobType,
            requirements,
            employer: employerId
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get job by ID
exports.getJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Job ID' });
    }

    try {
        const job = await Job.findById(id).populate('employer');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a job
exports.updateJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Job ID' });
    }

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Job ID' });
    }

    try {
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
