const express = require('express');
const router = express.Router();
const {getRoutes,createPost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {createPostValidator} = require('../validators')


router.get('/', getRoutes );

router.post('/post', requireSignin,createPostValidator ,createPost);


module.exports=router;