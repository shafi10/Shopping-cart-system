const User= require('../models/User')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationerrorFormatter')
const config = require('config')

exports.postSignup =async (req,res)=>{
    const { name, email, password} = req.body;

    const errors = validationResult(req).formatWith(errorFormatter)
   if(!errors.isEmpty()){
    return res.json({error:errors.mapped()})
  }

   try {
       let user = await User.findOne({email:email});
       if(user){
        return res.status(404).json('User Existis Already');
       }

       const avatar  = gravatar.url(email,{ s:'200',r:'pg',d:'mm'} ) 

       const hashPassword = await bcrypt.hash(password, 10);
       user = new User({
           name,email,
           password:hashPassword
           ,avatar,
           admin:0
       })

       const result = await user.save();

       res.status(201).json(result);

   } catch (error) {
       console.log(error);
   }

}

exports.postSignin =async (req,res)=>{
   const {email, password} = req.body;
   const errors = validationResult(req).formatWith(errorFormatter)
   if(!errors.isEmpty()){
    return res.json({error:errors.mapped()})
  }

   try {
       const user = await User.findOne({email});
       if(!user){
           return res.status(400).json('Invalid Credientails');
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
           return res.status(400).json('Invalid Crediantials')
       }
       const payload ={
           user:{
              id:user.id,
              admin:user.admin
           }
       }

       jwt.sign(payload, config.get('Secret'), {expiresIn: 36000}, (err, token)=>{
            if(err) throw err;
            res.json({token})
       })

   } catch (error) {
       console.log(error);
   }
}