const {Router}=require("express")
const userModel = require("../models/user.schema")
require("dotenv").config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter=Router()

userRouter.post("/register", async (req, res)=>{
    const{name, userName, email, password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            return res.status(200).send("user allready registered")
        }else{
            bcrypt.hash(password, 5, async(err, hashPassword)=>{
                if(err){
                    res.status(400).send({message:err.message})
                }else{
                    const userDetails= new userModel({name, userName, email, password:hashPassword})
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
    const {email, password}= req.body
    try {
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(400).send("user has not registerd, please register first")
        }else{
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    const token = jwt.sign({ course: 'backend' }, secret);
                    return res.status(200).send({message:"user login successfully", token:token})
                }else{
                    return res.status(400).send("wrong password")
                }
            });
        }
        
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})


module.exports=userRouter