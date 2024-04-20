const express=require("express")
const mongooseConnect = require("./src/config/db")
const usersRouter = require("./src/router/usersRoute")
const productRouter = require("./src/router/productRoute")

const PORT=8080
const app= express()
app.use(express.json())

//NOTE Home
app.get('/',(req,res)=>{
    res.status(200).send("This is home page")
})
//NOTE Users
app.use('/users', usersRouter)
//NOTE Products
app.use("/products", productRouter)

//NOTE Server run 
app.listen(PORT,()=>{
    try {
       mongooseConnect()
       console.log("we are connected to Database successfully");
       console.log("server running is",PORT);
    } catch (error) {
        console.log(error);
    }
})