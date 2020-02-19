const express  = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth')
const productValidator = require('../validator/productValidator')

const {postProduct, findSingleProduct, updateProduct, removeProduct} = require('../controllers/adminProductController')

router.post('/add-product',adminAuth,productValidator, postProduct)
router.get('/getProduct/:id', adminAuth,findSingleProduct)
router.put('/updateProduct/:id',adminAuth, updateProduct)
router.delete('/deleteProduct/:id',adminAuth, removeProduct)

module.exports = router