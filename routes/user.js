const express = require('express');
const router = express.Router();
const  { postSignup, postSignin} = require('../controllers/userController')
const signInValidator= require('../validator/signInvalidator')
const signupValidator = require('../validator/signupValidator')
const {body } = require('express-validator');

router.post('/signup',signupValidator, postSignup)
router.post('/login',signInValidator, postSignin)

module.exports= router;