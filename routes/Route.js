const express=require("express")
const router=express.Router()

const DoctorController=require("../controllers/DoctorController")
const PatientController=require("../controllers/PatientController")

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.json(
                    {
                        message:err
                    }
                );
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


router.get('/', DoctorController.allDoctor)
router.get('/getAllDoctor',authenticateJWT, DoctorController.allDoctor)
router.post('/findDoctor',authenticateJWT, DoctorController.singleDoctor);
router.post('/insertDoctor',authenticateJWT, DoctorController.insertDoctor);
router.post('/assignDoctor',authenticateJWT, DoctorController.assignDoctor);
router.get('/getAssignDoctor', DoctorController.getAssignDoctor);

router.post('/updateDoctor',authenticateJWT, DoctorController.updateDoctor);
router.post('/deleteDoctor',authenticateJWT, DoctorController.deleteDoctor);
router.post('/loginDoctor', DoctorController.loginDoctor);

router.get('/getAllPatient',authenticateJWT, PatientController.allPatient)
router.post('/findPatient',authenticateJWT, PatientController.singlePatient);
router.post('/insertPatient',authenticateJWT, PatientController.insertPatient);
router.post('/updatePatient',authenticateJWT, PatientController.updatePatient);
router.post('/deletePatient',authenticateJWT, PatientController.deletePatient);
router.post('/loginPatient', PatientController.loginPatient);

module.exports=router
