const express = require("express");
const {signup, signin, signout} = require("../controllers/auth");
const {userSignupValidator, userSigninValidator} = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator, signin);
router.get("/signout", signout);

module.exports = router;