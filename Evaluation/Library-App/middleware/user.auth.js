const jwt = require('jsonwebtoken');
require("dotenv").config()
const secret= process.env.secret
const auth= async (req, res, next)=>{
    const token =req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, secret, function(err, decoded) {
            console.log(decoded);
            next()
        });
    }else{
        return res.status(400).json({message:"token not found please login"})
    }
}

module.exports=auth