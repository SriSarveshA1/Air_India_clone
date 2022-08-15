/*
   1.Here we try to find whether the token exists
   2.Validate the token
   3.And then we try to store the userId retrived
   4.And then we try to verify the loggedIn user is admin
  
*/
const jwt=require("jsonwebtoken");
const secretConfig=require("../configs/secret.config");
const User=require("../models/user.model");
const constants=require("../utils/constants");
/*
 403 is When the user doesnt have the access to perform the action
 401 is for unauthorized access.
*/

const tokenValidator=(req,res,next) => {

    var token=req.headers["x-access-token"];

    if(!token)
    {
      return res.status(403).send({message:"No token is specified||Access Prohibited"})
    }

    jwt.verify(token,secretConfig.secret,(err,decoded)=>{
        if(err)
        {
            return res.status(401).send({message:"Invalid Token"})
        }
        else{
            req.userId=decoded.id;//so we are retriving the public userId using which we have created the token 
            next();
        }
    })

}

const isAdmin=async (req,res,next)=>{
      const user=await User.findOne({userId:req.userId});

      if(!user){
       return res.status(403).send({message:"User not found"})
      }
      if(user.userType!=constants.userTypes.admin)
      {
           return res.status(403).send({message:"Only admin are allowed to access this endpoint"});
      }
      else{
        next();//If incase if the user is admin
      }
}

module.exports={
    tokenValidator,
    isAdmin
}
