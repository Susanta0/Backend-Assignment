const access =(roles)=>{
    return (req, res, next)=>{
        // console.log(res);
        const currentUserRole=req.user.role
        if(roles.includes(currentUserRole)){
            next()
        }else{
            return res.status(401).send("you are not authorzied to access this route")
        }
    }
}

module.exports=access