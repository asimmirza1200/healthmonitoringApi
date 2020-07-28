const Patient =require( "../models/PatientModel");
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const Doctor =require( "../models/DoctorModel");

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
const getDashboardData =  (req, res,next) =>{
    Patient.find().then(response =>{
        Doctor.find().then(response2 =>{
            res.json({
                doctors:response2.length,
                patients:response.length

            })
        })
        .catch(error=>{
            res.json({
                message:"An Error occured"
            })
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
    let token=req.body.token

    Patient.find({"phonenumber":phonenumber}).then(response =>{
        if(response!=null){

            if(response[0].password==password){

                const accessToken = jwt.sign({ phonenumber: response[0].phonenumber,  password: response[0].password }, accessTokenSecret);
                    response[0].accessToken=accessToken
                    let updateToken= {
                        accessToken: accessToken,
                        firbaseToken:token

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
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
    // res.json({
    //             req:req2,
    //             message:"Doctor Added Successfully"
    //         })
    req2=JSON.parse(req2)
    let patient= new Patient({
        patientname: req2.patientname, 
        fathername: req2.fathername,
        address: req2.address,
        deviceid: req2.deviceid,
        phonenumber: req2.phonenumber,
        disease: req2.disease,
        password: req2.password,
        accessToken:"",
        firbaseToken:""

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
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
    req2=JSON.parse(req2)
    let patientId=req2.patientId
    Patient.findByIdAndRemove(patientId).then(response =>{
        res.json({
            message:"Patient Deleted Successfully"+patientId
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

module.exports={
    getDashboardData, allPatient,singlePatient,updatePatient,deletePatient,insertPatient,loginPatient
}