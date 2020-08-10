//const admin=require('./firebase-config');
const AssignDoctor =require( "../models/AssignDoctorModel");
const Patient =require( "../models/PatientModel");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const Admin =require( "../models/AdminModel");
var request = require('request');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthmonitoring1200.firebaseio.com"
});
const sendAlertNotification =  (req, res,next) =>{
   
   
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
  
    req2=JSON.parse(req2)
    console.log(req2.deviceid)
    Patient.find({"deviceid":req2.deviceid}).then(response =>{
        console.log(response)

        const query = AssignDoctor.find({"patient_id":response[0]._id});
    query.select('_id doctor_id patient_id');
    query.populate('doctor_id','_id doctorname fathername address qualification phonenumber specialization password createdAt updatedAt __v accessToken firbaseToken');
    query.populate('patient_id','_id patientname fathername address deviceid phonenumber disease password createdAt updatedAt __v accessToken firbaseToken');

    query.exec(function(error,result){
       if(error){
        res.json({
            message:"An Error occured"
        })     
      }else{
        result = JSON.stringify(result).replace(new RegExp("doctor_id", 'g'), "DoctorData");
        result = JSON.stringify(result).replace(new RegExp("patient_id", 'g'), "PatientData");

        result=JSON.parse(result);
        result=JSON.parse(result);
        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
          };
          var registrationTokens = [];
          for (let i = 0; i < result.length; i++) {
          registrationTokens[i] = result[i].DoctorData.firbaseToken;
         }
          
            Admin.find().then(response =>{
                registrationTokens[registrationTokens.length]= response[0].firbaseToken
                console.log(response)
            })
            .catch(error=>{
                res.json({
                    message:"An Error occured"
                })
            })
              
       
    const message_notification = {
        data: {
           title: result[0].PatientData.patientname,
           text: "Doctor I am in critical situation please contact with me",
              to:registrationTokens
        }
        };
    const options =  notification_options
       
//       admin.messaging().sendToDevice(registrationTokens, message_notification, options)
//       .then( response => {

//        res.status(200).send("Notification sent successfully"+registrationTokens.toString())
// //        res.json({

// //         result

// // })  
//       })
//       .catch( error => {
//           console.log(error);
//       });
   request.post('https://fcm.googleapis.com/fcm/send', {form:message_notification},(err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
  
   })
   .setHeader( 'Authorization',  "AAAAXSAkYdY:APA91bEr8cItAwUJ2_VQVkKK6YgB1T1HrmiFee8NG47fXQVrcB-5mP7ba3fZ4oaeaKMN4dd1txqR5dp3eo73E69uYodxk9k6Gn0hV2amadz0sQotWbf1-tny2diLk1eV2DKELOPxXT1U");
          
    
    
  }
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
   
      
})

};

module.exports={
    sendAlertNotification
}