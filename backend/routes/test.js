const express = require("express");
const testController = require("../controllers/test");
const {requireSignin} = require("../controllers/auth");
const {userById, hasAuthorization} = require("../controllers/user");
const router = express.Router();

// get a test response from the API
router.get("/test", testController.getTest);

// get a test response from the API only when signed in
router.get("/test-authentication", requireSignin, testController.getTest);

// get a test response from the API only when signed in and authorized
router.get("/test-authorization", requireSignin, hasAuthorization, testController.getTest);

// for any route containing :userId, the app will first execute userByID()
router.param("userId", userById);

module.exports = router;