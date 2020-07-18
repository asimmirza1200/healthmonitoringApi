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
    const query = AssignDoctor.find({"patient_id":req.body.patient_id});
    query.select('_id doctor_id patient_id');
    query.populate('doctor_id','_id doctorname fathername address qualification phonenumber specialization password createdAt updatedAt __v accessToken');
    query.populate('patient_id','_id patientname fathername address deviceid phonenumber disease password createdAt updatedAt __v accessToken');

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

    Doctor.find({"phonenumber":phonenumber}).then(response =>{
        if(response!=null){
            if(response[0].password==password){

                const accessToken = jwt.sign({ phonenumber: response[0].phonenumber,  password: response[0].password }, accessTokenSecret);
                    response[0].accessToken=accessToken
                    let updateToken= {
                        accessToken: accessToken
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
    let req1=req.replace('}: ""',"")
    let doctor= new Doctor({
        doctorname: req1.body.doctorname, 
        fathername: req1.body.fathername,
        address: req1.body.address,
        qualification: req1.body.qualification,
        phonenumber: req1.body.phonenumber,
        specialization: req1.body.specialization,
        password: req1.body.password,
        accessToken:""
    })
    doctor.save(doctor).then(response =>{
        res.json({
            req:req1.body,
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
    let doctor= new AssignDoctor({
        doctor_id: req.body.doctor_id,
        patient_id: req.body.patient_id,
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
    let docotrId=req.body.docotrId
    Doctor.findByIdAndRemove(docotrId).then(response =>{
        res.json({
            message:"Doctor Deleted Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

module.exports={
    allDoctor,singleDoctor,updateDoctor,deleteDoctor,insertDoctor,loginDoctor,assignDoctor,getAssignDoctor
}