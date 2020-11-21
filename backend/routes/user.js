const express = require("express");
const {
    userById, 
    allUsers, 
    getUser, 
    updateUser, 
    deleteUser, 
    hasAuthorization, 
    userPhoto,
    addFollowing, 
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople
} = require("../controllers/user");
const {requireSignin} = require("../controllers/auth");

const router = express.Router();

router.put("/users/follow", requireSignin, addFollowing, addFollower);
router.put("/users/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers); // we do not want to put authentication on this endpoint
router.get("/users/:userId", requireSignin, getUser);
router.put("/users/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/users/:userId", requireSignin, hasAuthorization, deleteUser);

// photo
router.get("/users/photo/:userId", userPhoto);
 


// who to follow
router.get("/users/findpeople/:userId", requireSignin, findPeople);

// for any route containing :userId, the app will first execute userByID()
router.param("userId", userById);

module.exports = router;