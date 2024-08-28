const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    _id : Number,
    empName : String,
    deptCode : String,
    basicSalary : Number,
    experience : Number,
    emailId : String,
    joiningDate: Date,
})

const employeeModel = mongoose.model('Employee',empSchema)
module.exports = employeeModel;