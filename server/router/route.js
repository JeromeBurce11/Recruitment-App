import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as applicantController from '../controllers/applicantController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password


/** Applicant routes */
router.route('/applicant').post(applicantController.createApplicant); // create an applicant
router.route('/all-applicants').get(applicantController.getAllApplicant); // get appplicants
router.route('/applicant/:id').get(applicantController.getApplicantById); //get an applicantdata
router.route('/update/applicant').put(applicantController.updateApplicant); // update uplicant
router.route('/delete/applicant/:id').delete(applicantController.deleteApplicant) // delete aplicant

export default router;