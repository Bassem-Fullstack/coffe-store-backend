

const jwt = require ("jsonwebtoken")

const User = require("../modules/User")

const dotenv = require("dotenv")

dotenv.config()

const auth = async ( req , res , next ) => {


try{


 const tokenConfirm = req.header("Authorization").replace("Bearer " , "").trim()   

  const decode = jwt.verify(tokenConfirm ,process.env.JWT_SECRET)

   console.log(decode)

   const userConfirm = await User.findOne({_id :decode.id , tokens : tokenConfirm }) 

 if(!userConfirm){
  
   return res.status(401).send({ error: "User not found" })


 }

 req.user = userConfirm

req.token = tokenConfirm

 next()

}


catch(e){

res.status(401).send({error : "plase authorization"})

}



}






module.exports = auth