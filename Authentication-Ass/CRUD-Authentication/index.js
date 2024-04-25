const express= require("express")
const DbConnect = require("./config/db")
const todosRouter = require("./router/todos")
const userRouter = require("./router/users")
const app=express()
const PORT=8080
app.use(express.json())

app.use("/todos",todosRouter)

app.use("/student", userRouter)

app.get("/", (req,res)=>{
    res.status(200).send("This is home page")
})


app.listen(PORT, async ()=>{
    try {
        await DbConnect()
        console.log("server is running",PORT);
    } catch (error) {
        console.log({message:error.message})
    }
})