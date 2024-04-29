const {Router}=require("express")
const bookModel = require("../models/book.schema")
const auth = require("../middleware/auth")
const access = require("../middleware/access")

const bookRouter=Router()

bookRouter.get("/", auth, access(["viewer","creator", "viewall"]), async (req, res)=>{
    try {
        const allbook = await bookModel.find()
        return res.status(200).send({message:"here you can see books details", allbook:allbook})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

bookRouter.get("/:id", auth, access(["viewer","creator", "viewall"]), async (req, res)=>{
    try {
        const allbook = await bookModel.findOne(req.params.id)
        return res.status(200).send({message:"here you can see books details", allbook:allbook})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})



bookRouter.post("/addbook", auth,access(["creator"]), async (req, res)=>{
    const{title, author, genres, totalCopies, availableCopies, publishDate}=req.body
    try {
        if(!title || !author){
            return res.status(400).send("some information is missing")
        }
        const bookDetails= new bookModel({title, author, genres, totalCopies, availableCopies, publishDate})
        await bookDetails.save()
        return res.status(201).send("new book added in the library")
    } catch (error) {
        return res.status(400).send({message:error.message})
    }

})

bookRouter.patch("/updatebook/:id", auth, access(["creator"]), async (req, res)=>{
    const{ totalCopies, availableCopies }=req.body
    try {
        if(!totalCopies || !availableCopies){
            return res.status(400).send("some information is missing")
        }
        const bookUpdated= await bookModel.findByIdAndUpdate(req.params.id,{ totalCopies, availableCopies })
       await bookUpdated.save()
        return res.status(201).send("book updated successfully")
    } catch (error) {
        return res.status(400).send({message:error.message})
    }

})


bookRouter.delete("/deletebook/:id", auth, access(["creator"]), async (req, res)=>{
    try {
        const bookDelete= await bookModel.findByIdAndDelete(req.params.id)
      
        return res.status(201).send("book deleted successfully")
    } catch (error) {
        return res.status(400).send({message:error.message})
    }

})


module.exports=bookRouter