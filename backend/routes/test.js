const express = require("express");
const testController = require("../controllers/test");

const router = express.Router();

// get a test response from the API
router.get("/test", testController.getTest);

module.exports = router;