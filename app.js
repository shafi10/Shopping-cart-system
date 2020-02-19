const express= require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser')
const config = require('config')

const app= express();
const cart = require('./routes/cart');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//espress session
app.use(session({
    secret: 'Secret',
    resave: true,
    saveUninitialized: true
    //cookie: { secure: true }
  }));

  app.get('*', function(req,res,next){
    res.locals.cart = req.session.cart;
    next()
  })

app.use('/user', require('./routes/user'))
app.use('/products', require('./routes/product'))
app.use('/admin', require('./routes/adminProduct'));
app.use('/cart', cart)

app.use('/',(req,res)=>{
    res.json('This is home page')
})  

  mongoose.connect(config.get('mongoUri'), ()=>{
      console.log('Database connected successfully');
  })


  app.listen(3000,()=>{
      console.log(`Server listten on port ${3000}`)
  })