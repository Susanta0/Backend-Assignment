const express=require("express")
const userModel = require("../models/userDetails")


const usersRouter= express.Router()

//NOTE GET
usersRouter.get('/', async (req,res)=>{
    try {
        const userData= await userModel.find()
        res.status(200).send(userData)
        console.log("get user data succesfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("somthing went wrong")
    }
})
//NOTE POST
usersRouter.post('/',async(req,res)=>{
    const { name, email, userName, age, password, pan, profilePicture, city }=req.body
    try {
        const usersInfo= new userModel({name, email, userName, age, password, pan, profilePicture, city})
        await usersInfo.save()
        console.log("new user created successfully");
        res.status(201).send("new user created successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("please fillup valid credential")
    }
})
//NOTE PATCH
usersRouter.patch("/:id", async(req,res)=>{
    const{name, password, profilePicture, city}=req.body
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.params.id, { name, password, profilePicture, city });
        console.log("user details updated");
        res.status(200).send("User details upadated")
    } catch (error) {
        console.log(error);
        res.status(404).send("somthing went wrong")
    }
})
//NOTE DELETE
usersRouter.delete('/:id',async(req,res)=>{
    try {
        const deleteUser= await userModel.findByIdAndDelete(req.params.id)
        console.log("User deleted");
        res.status(200).send("User deleted")
    } catch (error) {
        console.log(error);
        res.status(404).send("somthing went wrong")
    }
})

module.exports =usersRouter