const mongoose = require('mongoose');

//Define Schema
const applicationSchema = new mongoose.Schema({
    resume : {type:String , required:true},
    status : {
        type : String , 
        enum : ['pending', 'accepted', 'rejected'],
        default:'pending'
    },
    job : {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
    applicant : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    appliedAt: { type: Date, default: Date.now }

})

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application; 