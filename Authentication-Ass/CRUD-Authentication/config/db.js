const {connect}=require("mongoose")

const DbConnect=()=>{
    connect("mongodb://localhost:27017/Assignment")
}

module.exports=DbConnect