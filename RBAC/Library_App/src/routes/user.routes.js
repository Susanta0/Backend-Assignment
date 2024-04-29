const {Router}=require("express")
const userModel = require("../models/user.schema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter= Router()
require("dotenv").config()
const privateKey= process.env.privateKey



userRouter.post("/register", async (req, res)=>{
    const{name, userName, email, password, role}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            return res.status(200).send("user allready registered")
        }else{
            bcrypt.hash(password, 5, async(err, hashPassword)=>{
                if(err){
                    res.status(400).send({message:err.message})
                }else{
                    const userDetails= new userModel({name, userName, email, password:hashPassword, role})
                    await userDetails.save()
                    return res.status(201).send("user register successfully")
                }
            });
        }
        
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})


userRouter.post("/login", async (req, res)=>{
    const{ email, password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(400).send("first you should register")
        }else{
            bcrypt.compare(password, user.password, async (err, result)=>{
                if(result){
                    const accessToken = jwt.sign({_id:user._id, email:user.email, role:user.role}, privateKey,{expiresIn: "1h"});
                    const refreshToken = jwt.sign({_id:user._id, email:user.email, role:user.role}, privateKey,{expiresIn: "5min"});
                    return res.status(200).send({message:"user login successfully", accessToken:accessToken, refreshToken:refreshToken})
                }else{
                    res.status(400).send("wrong password")
                }
            });
        }

    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})




module.exports=userRouter