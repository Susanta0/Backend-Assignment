const {Schema, model}=require("mongoose")

const todosSchema= new Schema({
    name:{type:String, required:true},
    capId:{type:String, required:true},
    course:{type:String, required:true},
    topics:{type:String, required:true},
    status:{type:Boolean, required:true},
},{versionKey:false})

const todosModel= model("todo", todosSchema)

module.exports=todosModel