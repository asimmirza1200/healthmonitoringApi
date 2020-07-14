const Patient =require( "../models/PatientModel");
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const allPatient =  (req, res,next) =>{
    Patient.find().then(response =>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

const singlePatient =  (req, res,next) =>{
    let patientId=req.body.patientId
    Patient.findById(patientId).then(response =>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};


const loginPatient =  (req, res,next) =>{
    let phonenumber=req.body.phonenumber
    let password=req.body.password

    Patient.find({"phonenumber":phonenumber}).then(response =>{
        if(response!=null){

            if(response[0].password==password){

                const accessToken = jwt.sign({ phonenumber: response[0].phonenumber,  password: response[0].password }, accessTokenSecret);
                    response[0].accessToken=accessToken
                    let updateToken= {
                        accessToken: accessToken
                    }
                    Patient.findByIdAndUpdate(response[0]._id,{$set :updateToken}).then(response1 =>{
                    
                            res.json({
                                message: "Successfully Login",
                                data:response[0],
                                code:"202",
                                status:"true"  
                            })
                    })
                    .catch(error=>{
                        res.json({
                            message:response[0]._id
                        })
                    })


            }else{
                res.json({
                    message: "invalid Login Credentials",
                    data:[],
                    code:"505",
                    status:"false"  
                })
            }
        
        }else{
            res.json({
                message: "invalid Login Credentials",
                data:[],
                code:"505",
                status:"false"  
            })
        }
      
    })
    .catch(error=>{
        res.json({
            message: "invalid Login Credentials",
            data:[],
            code:"505",
            status:"false"  
        })
    })
      
};

const insertPatient =  (req, res,next) =>{
    let patient= new Patient({
        patientname: req.body.patientname, 
        fathername: req.body.fathername,
        address: req.body.address,
        deviceid: req.body.deviceid,
        phonenumber: req.body.phonenumber,
        disease: req.body.disease,
        password: req.body.password,
        accessToken:""

    })
    patient.save(patient).then(response =>{
        res.json({
            message:"Patient Added Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

const updatePatient =  (req, res,next) =>{
    let patientId=req.body.patientId
    let updatePatient= {
        Patientname: req.body.Patientname, 
        fathername: req.body.fathername,
        address: req.body.address,
        qualification: req.body.qualification,
        phonenumber: req.body.phonenumber,
        specialization: req.body.specialization
    }
    Patient.findByIdAndUpdate(patientId,{$set :updatePatient}).then(response =>{
        res.json({
            message:"Patient Updated Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

const deletePatient =  (req, res,next) =>{
    let patientId=req.body.patientId
    Patient.findByIdAndRemove(patientId).then(response =>{
        res.json({
            message:"Patient Deleted Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

module.exports={
    allPatient,singlePatient,updatePatient,deletePatient,insertPatient,loginPatient
}