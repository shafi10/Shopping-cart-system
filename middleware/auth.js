const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function(req,res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).json('not Authorized, No token Found')
    }

    try {
   const decoded = jwt.verify(token, config.get('Secret'))

    req.user = decoded.user;
    next()
    } catch (error) {
         console.log(error);
    }
}