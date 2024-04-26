const {connect}=require("mongoose")

const DbConnect= ()=>{
    connect(process.env.DB_URL)
}

module.exports=DbConnect