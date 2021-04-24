const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller");


// @route POST api/user/registerUser
// @desc register user
router.post("/signup", new AuthController().userSignUp);
router.post("/login", new AuthController().userLogin);

//api for POST, DELETE and UPDATE appointment
router.post("/appointment", new AuthController().addAppointment);
router.delete("/appointment", new AuthController().deleteAppointment);
router.put("/appointment", new AuthController().updateAppointment);

//api to GET merchant list
router.get("/allmerchant", new AuthController().findAllMerchant);
module.exports = router;
