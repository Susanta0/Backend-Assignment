const {Router}=require("express")
const userModel = require("../model/users")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const blacklistModel = require("../model/blacklist.model")
const userRouter=Router()
require("dotenv").config()

// user register
userRouter.post("/register", async (req, res)=>{
    const {name, userName, email, password}= req.body
    const user= await userModel.findOne({email})
    try {
        if(user){
           return res.status(200).send("user already registered")
        }
        bcrypt.hash(password, 5, (err, hashPassword)=> {
            // Store hash in your password DB.
            if(err){
               return res.status(400).send({message:err.message})
            }
            const userData= new userModel({name, userName, email, password:hashPassword})
            userData.save()
            return res.status(200).send("user registered successfully")
        });
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

// user login
userRouter.post("/login", async (req, res)=>{
    const {email, password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(!user){
           return res.status(401).send("Invalid credential")
        }
        bcrypt.compare(password, user.password, (err, result)=> {
            // result == true
            if(err){
                res.status(404).send({message:err.message})
            }
            if(result){
                const accessToken= jwt.sign({email:user.email},process.env.secret,{ expiresIn: '1h' })
                const refreshToken=jwt.sign({email:user.email}, process.env.secret ,{ expiresIn: '5min' })
                res.status(201).send({message:"user login successfully", access_Token:accessToken, refresh_Token:refreshToken})
            }else{
                return res.status(400).send("login details are incorrect")
            }
        });
        
    } catch (error) {
       return res.status(400).send({message:error.message})
    }
})

// user logout
userRouter.get("/logout", async (req, res)=>{
    const token= req.headers.authorization.split(" ")[1]
    try {
        if(!token){
            return res.status(401).send("token is provided")
        }
        const userToken= new blacklistModel({token})
        await userToken.save()
        return res.status(201).send("user logout successfully")
    } catch (error) {
        return res.status(400).send({message:error.message})
    }

})

module.exports=userRouter