const express = require("express");
const {checkDuplicate, checkUser} = require("../middleware/authentication");
const {registerUser, loginUser} = require("../controller/user.controller");
const router = new express.Router();


router.post("/register", checkDuplicate, registerUser); // register new user if email address is unique
router.post("/login", checkUser, loginUser); // check email address first before proceeding to login function

module.exports = router