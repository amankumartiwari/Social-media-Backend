const express = require('express');
const router = express.Router();
const {getRoutes,createPost} = require('../controllers/post');
const {createPostValidator} = require('../validators')


router.get('/', getRoutes );

router.post('/post', createPostValidator ,createPost);


module.exports=router;