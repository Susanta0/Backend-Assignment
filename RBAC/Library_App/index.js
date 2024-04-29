const express=require("express")
const mongooDb = require("./src/config/db")
const userRouter = require("./src/routes/user.routes")
const bookRouter = require("./src/routes/book.routes")
const app =express()
require("dotenv").config()
const PORT=process.env.PORT 

app.use(express.json())

app.use("/user", userRouter)

app.use("/book", bookRouter)


app.get("/", (req, res)=>{
    res.status(200).send("This is home page")
})

app.listen(PORT, async ()=>{
    try {
        await mongooDb()
        console.log(`server is running on http://localhost:${PORT} also connected database`);
    } catch (error) {
        console.log("Server is not running");
    }
})