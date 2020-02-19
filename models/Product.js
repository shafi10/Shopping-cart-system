const {Schema, model} = require('mongoose')

var productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number ,
        required:true
    }
})

const Product = model('Product', productSchema)
module.exports = Product;