const {Schema, model}=require("mongoose")

const blackListSchema= new Schema({
    token:{type: String}
},{versionKey: false})

const blacklistModel= model("balckLists", blackListSchema)

module.exports=blacklistModel