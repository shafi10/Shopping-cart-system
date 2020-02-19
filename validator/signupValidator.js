const {body } = require('express-validator');
const Users = require('../models/User');
module.exports  =[
    body('name')
    .isLength({min:2,max:15})
    .withMessage('Name must be 2 to 15 characters')
    .trim(),
    body('email')
    .isEmail().withMessage('Please provide a valid Email')
    .custom(async email=>{
      let user = await Users.findOne({email})
      if(user){
        return Promise.reject('email already used')
      }
    })
    .normalizeEmail(),
    body('password')
    .isLength({min:6}).withMessage('password must be 6 char'),
    body('confirmPassword')
    .isLength({min:6}).withMessage('password must be 6 char')
    .custom((confirmPassword, {req})=>{
      if(confirmPassword != req.body.password){
        throw new Error('passwords have to match!')
      }
      return true
    })
  ]