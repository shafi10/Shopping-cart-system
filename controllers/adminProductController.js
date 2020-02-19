const Product = require('../models/Product')
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationerrorFormatter')

exports.postProduct = async (req,res)=>{
   const {title, desc, category,price} = req.body; 

   const errors = validationResult(req).formatWith(errorFormatter)
   if(!errors.isEmpty()){
    return res.json({error:errors.mapped()})
  }
  
   var slug = title.replace(/\s+/g, '-').toLowerCase();
   var price2 = parseFloat(price).toFixed(2)
   
   try {
       const pro = await Product.findOne({slug:slug});

       if(pro){
           return res.status(404).json('Product Already exists')
       }
      const product = new Product({
          title, slug, desc,category, price:price2
      })
      const result = await product.save();
      res.status(201).json(result);

   } catch (error) {
       console.log(error);
   }

}

exports.findSingleProduct = async (req,res)=>{
    const id = req.params.id;
    try {
        const data = await Product.findById(id);
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

exports.updateProduct = async (req,res)=>{
    try {
         const result = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});

        res.status(201).json(result)

    } catch (error) {
        console.log(error)
    }
}

exports.removeProduct= async(req,res)=>{
    try {
        await Product.findByIdAndRemove(req.params.id)
        res.json('product deleted successful');
    } catch (error) {
        console.log(error)
    }
}