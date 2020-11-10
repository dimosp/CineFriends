const express = require('express');
const {getPosts, createPost, postsByUser, postById, singlePost, like, unlike } = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

router.put('/posts/like', requireSignin, like);
router.put('/posts/unlike', requireSignin, unlike);

// post routes
router.post('/posts/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/posts/:postId', singlePost);


// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;
