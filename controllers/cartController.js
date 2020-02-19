const Product = require('../models/Product')

exports.addCart =async (req,res)=>{
    var slug= req.params.product;
    try {
       const p = await Product.findOne({slug:slug})
            
            if(typeof req.session.cart == "undefined"){
                req.session.cart = [];
                req.session.cart.push({
                    title:slug,
                    qty:1,
                    price:parseFloat(p.price).toFixed(2)
                })
            }else{
                var cart = req.session.cart;
                var newItem = true;
    
                for(var i=0; i<cart.length; i++){
                    if(cart[i].title==slug){
                        cart[i].qty++
                        cart[i].subTotal = parseFloat(cart[i].price * cart[i].qty).toFixed(2)
                        newItem = false;
                        break;
    
                    }
                }
                if(newItem){
                    cart.push({
                        title:slug,
                        qty:1,
                        price:parseFloat(p.price).toFixed(2)
                    })
                }
            }
            console.log(req.session.cart);
            res.json(req.session.cart);
    
    } catch (error) {
        console.log(error)
    }
}

exports.updateCart = (req,res)=>{
    var slug = req.params.product
     var cart = req.session.cart;
     var action = req.query.action;

     for(var i = 0; i<cart.length; i++){
         if(cart[i].title==slug){
             switch(action){
                 case "add":
                     cart[i].qty++;
                     break;
                 case "remove":
                     cart[i].qty--;
                     if(cart[i].qty< 1) cart.splice(i, 1);
                     break;
                case "clear":
                   cart.splice(i, 1);
                   if(cart.length ==0 ) delete req.session.cart;
                    break;
                default:
                    console.log('update problem')
                    break;
             }
             break;
         }
     }
     res.status(200).json(req.session.cart)
}


exports.clearCart = (req,res)=>{
    delete req.session.cart;
    res.status(200).json('cart Cleared')
}