const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const medicinePrescriptionSchema = new Schema({
    medicine: {type: String},
    symptom: {type: String},
    disease: {type: String},
    doctor_id:  {type: Schema.Types.ObjectId, ref : 'Doctor', required: true},
    patient_id:  {type: Schema.Types.ObjectId, ref : 'Patient', required: true},
},{timestamps:true});

const medicinePrescription = mongoose.model('MedicinePrescription', medicinePrescriptionSchema )
module.exports=medicinePrescription