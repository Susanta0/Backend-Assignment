const {Router}=require("express")
const userModel = require("../models/user")
const jwt=require("jsonwebtoken")
const userRouter=Router()


//NOTE new user register
userRouter.post("/register", async(req, res)=>{
    const {name, email, password}=req.body
    const user= await userModel.findOne({email})
    try {
        if(user){
           return res.status(201).send("User has already registered")
        }else{
            const newUser= new userModel({name, email, password})
            await newUser.save()
            return res.status(200).send("New user register successfully")
        }
    } catch (error) {
       return res.status(500).send({message:error.message})
    }
})

//NOTE login user
userRouter.post("/login", async(req, res)=>{
    const {email, password}=req.body
    const user= await userModel.findOne({email})
   try {
    if(!user){
        return res.status(400).send("Invaild credential")
    }if(user && user.password===password){
        const token = jwt.sign({ foo: 'bar' }, 'masai', { expiresIn: "1h"});
        return res.status(200).send({message:"Login successfully", token:token})
    }else{
        return res.status(400).send("Invalid credential")
    }
   } catch (error) {
    return res.status(400).send({message:error.message})
   }
})

module.exports=userRouter
