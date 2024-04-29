const {connect}=require("mongoose")

const mongooDb = ()=>{
   connect(process.env.MONGOO_URL)
}

module.exports=mongooDb