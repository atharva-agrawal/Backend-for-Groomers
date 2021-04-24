const express = require('express');
const AuthController = require("../controller/auth.controller");
const router = express.Router();



//Merchant Login/Signup
router.post("/signup", new AuthController().merchantSignup);
router.post("/login", new AuthController().merchantLogin);

//Api for Services

//Adding a new Service
router.post("/service", new AuthController().addService);
//Updating a Service
router.put("/service", new AuthController().updateService);
//Deleting a service
router.delete("/service", new AuthController().deleteService);
//Retrieving a service
router.get("/service", new AuthController().findAllServices);

//Api for Company Details
router.put("/companydetails", new AuthController().updateCompanyDetails);
router.get("/companydetails", new AuthController().findAllCompanyDetails);

//Api for GET appointment
router.get("/appointment", new AuthController().findAllApointment);
module.exports = router;