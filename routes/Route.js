const express=require("express")
const router=express.Router()

const DoctorController=require("../controllers/DoctorController")
const PatientController=require("../controllers/PatientController")
const NotificationAlertController=require("../controllers/NotificationAlertController")

const jwt = require('jsonwebtoken');
const MedicineController = require("../controllers/MedicineController");
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
router.get('/getAllDoctor', DoctorController.allDoctor)
router.post('/findDoctor', DoctorController.singleDoctor);
router.post('/insertDoctor', DoctorController.insertDoctor);
router.post('/assignDoctor', DoctorController.assignDoctor);
router.post('/getAssignDoctor', DoctorController.getAssignDoctor);
router.post('/getAssignPatient', DoctorController.getAssignPatient);

router.post('/getAssignMedicineData',authenticateJWT, MedicineController.getAssignMedicineData);
router.post('/insertMedicineData',authenticateJWT, MedicineController.insertMedicineData);
router.post('/deleteMedicineData',authenticateJWT, MedicineController.deleteMedicineData);

router.post('/updateDoctor', DoctorController.updateDoctor);
router.post('/deleteDoctor', DoctorController.deleteDoctor);
router.post('/loginDoctor', DoctorController.loginDoctor);

router.get('/getDashboardData', PatientController.getDashboardData)

router.get('/getAllPatient', PatientController.allPatient)
router.post('/findPatient', PatientController.singlePatient);
router.post('/insertPatient', PatientController.insertPatient);
router.post('/updatePatient', PatientController.updatePatient);
router.post('/deletePatient', PatientController.deletePatient);
router.post('/loginPatient', PatientController.loginPatient);

router.post('/sendAlertNotification', NotificationAlertController.sendAlertNotification);

module.exports=router
