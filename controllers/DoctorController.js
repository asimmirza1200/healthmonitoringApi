const Doctor =require( "../models/DoctorModel");
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';




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
    let doctor= new Doctor({
        doctorname: req.body.doctorname, 
        fathername: req.body.fathername,
        address: req.body.address,
        qualification: req.body.qualification,
        phonenumber: req.body.phonenumber,
        specialization: req.body.specialization,
        password: req.body.password,
        accessToken:""
    })
    doctor.save(doctor).then(response =>{
        res.json({
            message:"Doctor Added Successfully"
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
    allDoctor,singleDoctor,updateDoctor,deleteDoctor,insertDoctor,loginDoctor
}