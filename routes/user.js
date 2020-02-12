const express = require('express');

const {requireSignin} = require('../controllers/auth');
const {userFindById, getAllUsers,getUser,updateUser,deleteUser} = require('../controllers/user')
const router = express.Router();

router.get('/users',getAllUsers);
router.get('/user/:userId',requireSignin,getUser);
router.put('/user/:userId',requireSignin , updateUser);
router.delete('/user/:userId',requireSignin,deleteUser );
// any rote containing userById param will first execute user find by id
router.param("userId" , userFindById )

module.exports =router;