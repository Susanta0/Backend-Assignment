const express=require("express")

const mongooseDb = require("./src/config/db")
const moviesRouter = require("./src/router/moviesRoute")
const app=express()
const PORT=8080

app.use(express.json())

app.get('/',(req,res)=>{
    try {
        console.log("Get requested Successfully");
        res.status(200).send("Get request successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("Something Went Wrong")
    }
})

app.use("/movies",moviesRouter)


//NOTE Server run
app.listen(PORT, async()=>{ 
    try {
      await mongooseDb()
       console.log("we are connected to Database successfully");
       console.log("server running is",PORT);
    } catch (error) {
        console.log(error);
    }
})