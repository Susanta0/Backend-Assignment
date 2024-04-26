const express= require("express")
const DbConnect = require("./src/config/db")
const userRouter = require("./src/router/user.router")

const app= express()
const dotenv= require("dotenv").config()

const PORT= process.env.PORT || 8080
app.use(express.json())

app.use("/users", userRouter)

app.get("/", (req, res)=>{
    return res.status(200).send("This is the home page")
})


app.listen(PORT, async ()=>{
    try {
        await DbConnect()
        console.log(`server is running on ${PORT}`)
    } catch (error) {
        console.log({message:error.message})
    }
})