const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    doctorname:{type: String}, 
    fathername: {type: String},
    address: {type: String},
    qualification: {type: String},
    phonenumber: {type: String},
    date: {type: Date},
    specialization: {type: String},
    password: {type: String},
    accessToken: {type: String},
    firbaseToken: {type: String},

},{timestamps:true});

const doctor = mongoose.model('Doctor', doctorSchema )
module.exports=doctor