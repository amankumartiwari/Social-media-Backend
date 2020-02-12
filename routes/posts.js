const express = require('express');
const router = express.Router();
const {getRoutes,createPost} = require('../controllers/post');
const {userFindById} = require('../controllers/user')
const {requireSignin} = require('../controllers/auth');
const {createPostValidator} = require('../validators')


router.get('/', getRoutes );

router.post('/post/new/:userId', requireSignin,createPost,createPostValidator);

router.param("userId" , userFindById )

module.exports=router;