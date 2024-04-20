const express=require("express");
const productModel = require("../models/productsDetails");

const productRouter= express.Router()

//NOTE GET 
productRouter.get("/", async(req, res)=>{
    try {
        const productData= await productModel.find()
        res.status(200).send(productData)
    } catch (error) {
        console.log(error);
        res.status(400).send("Somthing went wrong")
    }
})
//NOTE POST
productRouter.post("/",async(req,res)=>{
    const{title, modelName, price, color, description, image}=req.body
    try {
        const productsData= new productModel({title, modelName, price, color, description, image, })
        await productsData.save()
        console.log("new product created successfully");
        res.status(201).send("new product created successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("please fillup valid credential")
    }
})
//NOTE PATCH
productRouter.patch("/:id",async (req,res)=>{
    const{ price, color, description, image,}=req.body
    try {
        const updateProduct= await productModel.findByIdAndUpdate(req.params.id, {price, color, description, image})
        console.log("product details updated");
        res.status(200).send("Product details upadated")
    } catch (error) {
        console.log(error);
        res.status(404).send("somthing went wrong")
    }
})
//NOTE DELETE
productRouter.delete("/:id", async(req,res)=>{
    try {
        const deleteProduct= await productModel.findByIdAndDelete(req.params.id)
        console.log("Product deleted");
        res.status(200).send("Product deleted")
    } catch (error) {
        console.log(error);
        res.status(404).send("somthing went wrong")
    }
})

module.exports=productRouter