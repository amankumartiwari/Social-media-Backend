const express = require('express');
const router = express.Router();
const {getRoutes,createPost} = require('../controllers/post');
const validator = require('../validators')


router.get('/', getRoutes );

router.post('/post', validator.createPostValidator ,createPost);


module.exports=router;