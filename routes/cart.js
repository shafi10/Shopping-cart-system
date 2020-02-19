const express=require('express');
const router = express.Router();
const {addCart, clearCart, updateCart} = require('../controllers/cartController')
const auth = require('../middleware/auth')

router.get('/add/:product',auth, addCart)
router.get('/update/:product',auth,updateCart)
router.get('/clear',auth, clearCart)


module.exports =router;