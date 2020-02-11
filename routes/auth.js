const express = require('express');

const {signup,signin,signout} = require('../controllers/auth')
const {userFindById} = require('../controllers/user')
const {userSignupValidator} = require('../validators')
const router = express.Router();


router.post('/signup',userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// any rote containing userById param will first execute user find by id
router.param("userById" , userFindById )

module.exports =router;