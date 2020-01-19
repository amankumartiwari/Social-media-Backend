const express = require('express');
const router = express.Router();
const {getRoutes} = require('../controllers/post');

router.get('/', getRoutes );

module.exports=router;