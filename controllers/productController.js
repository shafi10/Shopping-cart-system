const Product = require('../models/Product')

exports.getProduct = async (req,res)=>{
       try {
           const data = await Product.find();
           res.status(201).json(data);
       } catch (error) {
           console.log(error)
       }
}