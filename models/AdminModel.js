const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {type: String},
    password: {type: String},
    accessToken: {type: String},
    firbaseToken: {type: String},

},{timestamps:true});

const admin = mongoose.model('Admin', adminSchema )
module.exports=admin