'use strict';
var router = require('express').Router();
var authController=require('../controllers/authController');


router.post('/register', authController.addUser);
router.post('/login', authController.checklogin);

module.exports = router;
