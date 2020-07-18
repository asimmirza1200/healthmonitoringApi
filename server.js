const express = require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const morgan= require('morgan')

const doctorRoute = require('./routes/Route');
// "mongodb+srv://asimirza:Asimirza1200@cluster0-tsbkn.mongodb.net/test?retryWrites=true&w=majority" || 
var mongoDB ='mongodb+srv://asimirza:Asimirza1200@cluster0-tsbkn.mongodb.net/test?retryWrites=true';
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
 app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use("",doctorRoute)