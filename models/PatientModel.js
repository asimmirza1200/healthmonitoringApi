const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    patientname:{type: String}, 
    fathername: {type: String},
    address: {type: String},
    deviceid: {type: String},
    phonenumber: {type: String},
    date: {type: Date},
    disease: {type: String},
    password: {type: String},
    accessToken: {type: String},
    firbaseToken: {type: String},

},{timestamps:true});

const patient = mongoose.model('Patient', patientSchema )
module.exports=patient