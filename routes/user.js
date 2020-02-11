const express = require('express');


const {userFindById, getAllUsers} = require('../controllers/user')
const router = express.Router();

router.get('/users',getAllUsers);

// any rote containing userById param will first execute user find by id
router.param("userById" , userFindById )

module.exports =router;