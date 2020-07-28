const MedicinePrescription =require( "../models/MedicineModel");
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';




const getAssignMedicineData =  (req, res,next) =>{
    MedicinePrescription.find({"patient_id":req.body.patient_id}).then(response =>{
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






const insertMedicineData =  (req, res,next) =>{
    let medicinePrescription= new MedicinePrescription({
        medicine: req.body.medicine, 
        disease: req.body.disease,
        symptom: req.body.symptom,
        doctor_id: req.body.doctor_id,
        patient_id: req.body.patient_id,
        doctorname: req.body.doctorname,

    })
    medicinePrescription.save(medicinePrescription).then(response =>{
        res.json({
            message:"Medicine Added Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};



const deleteMedicineData =  (req, res,next) =>{
    let medicineid=req.body.medicineid
    MedicinePrescription.findByIdAndRemove(medicineid).then(response =>{
        res.json({
            message:"Medicine Deleted Successfully"
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error occured"
        })
    })
      
};

module.exports={
    deleteMedicineData,insertMedicineData,getAssignMedicineData
}