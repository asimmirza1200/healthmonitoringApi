const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const assignDoctorSchema = new Schema({
    doctor_id:  {type: Schema.Types.ObjectId, ref : 'Doctor', required: true},
    patient_id:  {type: Schema.Types.ObjectId, ref : 'Patient', required: true},
},{timestamps:true});

const assignDoctor = mongoose.model('AssignDoctor', assignDoctorSchema )
module.exports=assignDoctor