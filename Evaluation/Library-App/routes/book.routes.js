const {Router}=require("express")
const bookModel = require("../models/book.schema")
const auth = require("../middleware/user.auth")
const bookRouter=Router()

bookRouter.get("/showbook", async (req, res)=>{
    const{data}=req.body
    try {
        const allbooks= await bookModel.find({data})
        return res.status(200).send({message:"all books are here", allbooks})
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

bookRouter.post("/addbook", async (req, res)=>{
    const {title, author, discription, year}=req.body
    try {
        const bookDetails= new bookModel({title, author, discription, year})
        await bookDetails.save()
        return res.status(201).send("book added successfully")
    } catch (error) {
        return res.status(400).send("you can't add the book, first register successfully")
    }
})


module.exports=bookRouter