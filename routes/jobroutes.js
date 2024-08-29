const express = require('express');
const jobController = require('../controllers/jobController');
const router = express.Router();

router.post('/', jobController.createJob);
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);


router.post('/jobs', jobController.createJob);

module.exports = router;
