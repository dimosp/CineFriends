const express = require("express");
const {signup, signin} = require("../controllers/auth");
const {userSignupValidator, userSigninValidator} = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);

module.exports = router;