const express = require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const morgan= require('morgan')

const doctorRoute = require('./routes/Route');
// "mongodb+srv://asimirza:Asimirza1200@cluster0-tsbkn.mongodb.net/test?retryWrites=true&w=majority" || 
var mongoDB ='mongodb+srv://asimirza:Asimirza1200@cluster0-tsbkn.mongodb.net/test?retryWrites=true ||  mongodb://localhost:27017/healthmonitoring';
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.log.bind(console, 'MongoDB connection established'));

const app= express()

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const PORT =process.env.PORT || 3000
app.listen(PORT, () =>
    console.log(`Helath Monitoring app listening on port ${PORT}!`)

)
app.use("",doctorRoute)