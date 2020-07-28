const Doctor =require( "../models/DoctorModel");
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const AssignDoctor =require( "../models/AssignDoctorModel");




const allDoctor =  (req, res,next) =>{
    Doctor.find().then(response =>{
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

const getAssignDoctor =  (req, res,next) =>{
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
  
    req2=JSON.parse(req2)
    const query = AssignDoctor.find({"patient_id":req2.patient_id});
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

        res.json({
                 result
        })       }
    });
      
};
const getAssignPatient =  (req, res,next) =>{
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
  
    req2=JSON.parse(req2)
    const query = AssignDoctor.find({"doctor_id":req2.doctor_id});
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

        res.json({
                 result
        })       }
    });
      
};

const singleDoctor =  (req, res,next) =>{
    let docotrId=req.body.docotrId
    Doctor.findById(docotrId).then(response =>{
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

const loginDoctor =  (req, res,next) =>{
    let phonenumber=req.body.phonenumber
    let password=req.body.password
    let token=req.body.token

    Doctor.find({"phonenumber":phonenumber}).then(response =>{
        if(response!=null){
            if(response[0].password==password){

                const accessToken = jwt.sign({ phonenumber: response[0].phonenumber,  password: response[0].password }, accessTokenSecret);
                    response[0].accessToken=accessToken
                    response[0].firbaseToken=token

                    let updateToken= {
                        accessToken: accessToken,
                        firbaseToken:token

                    }
                    Doctor.findByIdAndUpdate(response[0]._id,{$set :updateToken}).then(response1 =>{
                    
                            res.json({
                                message: "Successfully Login",
                                data:response[0],
                                code:"202",
                                status:"true"  
                            })
                    })
                    .catch(error=>{
                        res.json({
                            message:error
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

const insertDoctor =  (req, res,next) =>{
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
    // res.json({
    //             req:req2,
    //             message:"Doctor Added Successfully"
    //         })
    req2=JSON.parse(req2)
    let doctor= new Doctor({
        doctorname: req2.doctorname, 
        fathername: req2.fathername,
        address: req2.address,
        qualification: req2.qualification,
        phonenumber: req2.phonenumber,
        specialization: req2.specialization,
        password: req2.password,
        accessToken:"",
        firbaseToken:""

    })
    doctor.save(doctor).then(response =>{
        res.json({
            req:req2,
            message:"Doctor Added Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};
const assignDoctor =  (req, res,next) =>{
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")

    req2=JSON.parse(req2)
    let doctor= new AssignDoctor({
        doctor_id: req2.doctor_id,
        patient_id: req2.patient_id,
    })
    doctor.save(doctor).then(response =>{
        res.json({
            message:"Doctor Assigned Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};
const updateDoctor =  (req, res,next) =>{
    let docotrId=req.body.docotrId
    let updatedoctor= {
        doctorname: req.body.doctorname, 
        fathername: req.body.fathername,
        address: req.body.address,
        qualification: req.body.qualification,
        phonenumber: req.body.phonenumber,
        specialization: req.body.specialization
    }
    Doctor.findByIdAndUpdate(docotrId,{$set :updatedoctor}).then(response =>{
        res.json({
            message:"Doctor Updated Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

const deleteDoctor =  (req, res,next) =>{
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
    req2=JSON.parse(req2)

    let doctorId=req2.doctorId
    Doctor.findByIdAndRemove(doctorId).then(response =>{
        res.json({
            message:req2
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

module.exports={
    getAssignPatient,allDoctor,singleDoctor,updateDoctor,deleteDoctor,insertDoctor,loginDoctor,assignDoctor,getAssignDoctor
}