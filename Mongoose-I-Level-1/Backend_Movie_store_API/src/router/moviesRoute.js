const express=require("express")
const moviesModel = require("../models/movies")

const moviesRouter= express.Router()

moviesRouter.get("/", async(req,res)=>{
    try {
        const moviesData= await moviesModel.find()
        res.status(200).send(moviesData)
        console.log(moviesData);
    } catch (error) {
        console.log(error);
        res.status(400).send("Somthing Went Wrong")
    }
})

moviesRouter.post('/',async(req, res)=>{
    const{title, releaseYear, duration, genres, director, image, reviews}=req.body
    try {
        const movieData= new moviesModel({title, releaseYear, duration, genres, director, image, reviews})
        await movieData.save()
        res.status(200).send("movie data added successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong")
    }
})

moviesRouter.patch('/:id',async(req, res)=>{
    const{ image, reviews}=req.body
    try {
        const movieUpdate= await moviesModel.findByIdAndUpdate(req.params.id,{image, reviews})
        res.status(200).send("movie data updated successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong")
    }
})

moviesRouter.delete('/:id',async(req, res)=>{
    try {
        const movieUpdate= await moviesModel.findByIdAndDelete(req.params.id)
        res.status(200).send("movie data deleted successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong")
    }
})



module.exports=moviesRouter