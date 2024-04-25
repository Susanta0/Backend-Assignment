const {Router}=require("express")
const todosModel = require("../models/todo")
const jwt= require("jsonwebtoken")
const todosRouter=Router()


//NOTE >>>>> middleware(if you have token then only can access todos all pages)
const authMiddleWare= (req, res, next)=>{
    const token= req.headers.authorization.split(" ")[1]
    jwt.verify(token, 'masai', (err, decoded)=> {
        if(err){
            return res.status(500).send("You are not allowed to access it")
        }else{
            next()
        }
    });
}

// todos get request
todosRouter.get("/todoshome", authMiddleWare, async(req, res)=>{
    const {data}=req.body
    try {
        const todos= await todosModel.find(data)
        return res.status(200).send({message:"this is todos home page", todos})
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

// todos filter
todosRouter.get("/todosfilter", authMiddleWare, async (req, res)=>{
    try {
        const filter={}
        if(req.query.name){
            filter.name=req.query.name
        }if(req.query.capId){
            filter.capId=req.query.capId
        }if(req.query.course){
            filter.course=req.query.course
        }
        const filterData= await todosModel.find(filter)
        res.status(200).send(filterData)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

// todos post request
todosRouter.post("/addtodo", authMiddleWare, async (req, res)=>{
    const {name, capId, course, topics, status}=req.body
    const user= await todosModel.findOne({capId})
    try {
        if(user){
            return res.status(201).send("user has already register")
        }else{
            const todos= new todosModel({name, capId, course, topics, status})
            todos.save()
            return res.status(200).send({message:"todo added successfully",todos})
        }
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

// todos patch request
todosRouter.patch("/edittodo/:id", authMiddleWare, async (req, res)=>{
    const {course, topics, status }=req.body
    try {
        const updateTodo = await todosModel.findByIdAndUpdate(req.params.id,{course, topics, status})
        return res.status(200).send({message:"Product details upadated", updateTodo})
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

// todos delete request
todosRouter.delete("/:id", authMiddleWare, async (req, res)=>{
    try {
        const deleteTodo = await todosModel.findByIdAndDeleted(req.params.id)
        return res.status(200).send({message:"Product deleted", deleteTodo})
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

module.exports=todosRouter