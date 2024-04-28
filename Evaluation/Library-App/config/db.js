const {connect}=require("mongoose")

const Dbconnection=()=>{
    connect(process.env.DB_URL)
}

module.exports=Dbconnection