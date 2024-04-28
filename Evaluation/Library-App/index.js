const express= require("express")
const Dbconnection = require("./config/db")
const userRouter = require("./routes/user.routes")

const app = express()
require("dotenv").config()
const PORT = process.env.PORT 
app.use(express.json())

app.use("/user", userRouter)

app.get("/", (req, res)=>{
    return res.status(200).send("this is home page")
})


app.listen(PORT, async ()=>{
    try {
        await Dbconnection()
        console.log("database also connected")
        console.log("server is running",PORT);
    } catch (error) {
        console.log({message:error.message});
    }
})