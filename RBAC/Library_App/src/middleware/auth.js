const jwt = require('jsonwebtoken');
require("dotenv").config()
const privateKey = process.env.privateKey

const auth =(req, res, next)=>{
    const header= req.headers["authorization"]
    const token = header?.split(" ")[1]
    if(!token){
        return res.status(400).send("token is not provided")
    }else{
        jwt.verify(token, privateKey, (err, result)=> {
            if(result){
                req.user=result
                next()
            }else{
                return res.status(400).send("token is incorrect")
            }
          });
    }
}

module.exports=auth