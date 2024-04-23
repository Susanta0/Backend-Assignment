const express=require("express")
const app=express()
const PORT=8080
app.use(express.json())

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const {connect, Schema, model}=require("mongoose")

const DbConnect= async ()=>{
    await connect("mongodb://localhost:27017/authUser_Data")
}

//NOTE Schema
const userSchema= new Schema({
    name:{type:String, required:true},
    email:{type: String, required:true},
    userName:{type:String, required:true},
    password:{type:String, required:true},
    role:{type: String, enum:["student", "admin"], required: true}
},{versionKey: false})

const userModel= model("authuser", userSchema)


//NOTE middleware
const authMiddleware=(req,res,next)=>{
    const token= req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, 'masai', function(err, decoded){
        if(err){
            return res.status(500).send("You are not allowed to access it")
        }else{
            next()
        }
    }) 
}

//NOTE home
app.get('/',(req,res)=>{
    res.status(200).send("This is the home page")
})

//NOTE users
app.get("/users", async(req,res)=>{
    const {data}=req.body
    try {
        const userData= await userModel.find(data)
        res.send(userData)
    } catch (error) {
       return res.status(400).send("Something went worong")
    }
})

//NOTE useradd
app.post('/register', async(req, res)=>{
    const {name, email, userName, password, role}=req.body
    const user = await userModel.findOne({email})
    console.log(user);
    try {
        if(user){
           return res.status(201).send("User already registered with us")
        }else{
            bcrypt.hash(password, 10, async function(err, hashedPassword) {
                const newUser= new userModel({name, email, userName, password:hashedPassword, role})
                await userModel.create(newUser)
            });
           return res.status(200).send("New user registered successfully")
        }
    } catch (error) {
       return res.status(400).send({message:error.message})
    }
})

//NOTE login
app.post('/login', async(req,res)=>{
    const { email, password}=req.body
    const user= await userModel.findOne({email})
    // try {
    //     if(!user){
    //         return res.status(400).send("Invaild credential")
    //     }if(user && user.password===password){
    //         const token = jwt.sign({ foo: 'bar' }, 'masai');
    //         return res.status(200).send({message:"Login successfully", token:token})
    //     }else{
    //         return res.status(400).send("Invalid credential")
    //     }
        
    // } catch (error) {
    //     return res.status(400).send({message:error.message})
    // }

    if(!user){
        return res.status(400).send("Invaild credential")
    }else{
        bcrypt.compare(password, user.password, async (err, result)=>{
            
            try {
                if(result){
                    const token = jwt.sign({roleAssigned:user.password},"masai")
                    return res.status(200).send({message:"Logged in successfully", token:token})
                }else{
                    return res.status(400).send(err)
                }
            } catch (error) {
                res.status(400).send({message: error.message})
            }
        });
    }

})

//NOTE reports
app.get("/report", authMiddleware, async(req,res)=>{
    // const token= req.headers.authorization.split(" ")[1];
    // console.log(token);
    try {

        // jwt.verify(token, 'masai', function(err, decoded){
        //     if(err){
        //         return res.status(500).send("You are not allowed to access it")
        //     }else{
        //         return res.status(200).send("This is report page")
        //     }
        // }) 

        return res.status(200).send("This is report page")
    } catch (error) {
       return res.status(400).send("Something went worong")
    }
})

//NOTE server
app.listen(PORT, async ()=>{
    try {
        await DbConnect()
        console.log("server running is",PORT);
    } catch (error) {
        console.log(error);
    }
})

