const express = require("express");
const {userById, allUsers, getUser, updateUser, deleteUser, hasAuthorization, addFollowing, addFollower} = require("../controllers/user");
const {requireSignin} = require("../controllers/auth");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
// we do not want to put authentication on this endpoint
router.get("/users", allUsers);

router.get("/users/:userId", requireSignin, getUser);
router.put("/users/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/users/:userId", requireSignin, hasAuthorization, deleteUser);

// for any route containing :userId, the app will first execute userByID()
router.param("userId", userById);

module.exports = router;