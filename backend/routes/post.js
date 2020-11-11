const express = require('express');
const {
    getPosts,
    createPost,
    postsByUser, 
    postById, 
    singlePost, 
    comment, 
    uncomment,
    like, 
    unlike,
    photo,
    updatePost,
    deletePost,
    isPoster
} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

// comments
router.put("/posts/comment", requireSignin, comment);
router.put("/posts/uncomment", requireSignin, uncomment);

// like - unline
router.put('/posts/like', requireSignin, like);
router.put('/posts/unlike', requireSignin, unlike);

// post routes
router.post('/posts/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/posts/:postId', singlePost);
router.put('/posts/:postId', requireSignin, isPoster, updatePost);
router.delete('/posts/:postId', requireSignin, isPoster, deletePost);

// photo
router.get('/posts/photo/:postId', photo);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;