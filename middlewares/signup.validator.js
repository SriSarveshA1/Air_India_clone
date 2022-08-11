//here we try to validate for signup
/*
 1.Valid email
 2.valid password,
 3.Valid userType (only customer) and admin should not be passed
 4.Whether already an user exists with the same email
 5.Whether already an user exists with the given userId
*/
//Also we try to validate for signin
/*
 1.Either req.body.email or req.body.userId has been passed
*/
const User=require("../models/user.model");
const constants=require("../utils/constants");

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validateSignUpRequest =async (req, res,next) =>{
    //if the name is not specified
    if(!req.body.name)
    {
        return res.status(400).send({message:"Name is not specified"});
    }
////////////////////////////////////*
    //if the userId is not specified
    if(!req.body.userId)
    {
        return res.status(400).send({message:"userId is not specified"});
    }

    //if specified it should not be duplicate
    try{
        if(req.body.userId)
        {
            const user=await User.findOne({userId:req.body.userId});
            if(user)
            {
                return res.status(400).send({message:"User already exists with the given userId"});
            }
        }
    }
    catch(err){
        return res.status(500).send({
            message: "Internal server error while validating the request"
        });
    }
////////////////////////////////////*
    //if the email is not specified
    if(!req.body.email){
        return res.status(400).send({message:"Password is not specified"});
    }
    //if specified it should not be duplicate
    try{
       if(req.body.email)
       {
           const user=await User.findOne({email:req.body.email});
           if(user)
           {
            return res.status(400).send({message:"User already exists within email"}); 
           }
       }
    }
    catch(err){
        return res.status(500).send({
            message: "Internal server error while validating the request"
        });
    }

    //so we should check whether the email is valid
    if(!isValidEmail(req.body.email))
    {
       return res.status(400).send({message:"Invalid email id"});
    }
//////////////////////////////////////*
    if(!req.body.password)
    {
       return res.status(400).send({message:"Password is required"})
    }
    //So we check whether the password is valid that is (we want its length to be >=8)
    if(req.body.password.length < 8)
    {
       return res.status(400).send({message:"Password is not strong have to be at least 8 characters"})
    }


 /////////////////////////////////////*
 
 
    if(!req.body.userType)
    {
        return res.status(400).send({message:"userType is required"})
    }
    //so we should not allow any api calls to create an user who is ADMIN type.
    if(req.body.userType==constants.userTypes.admin)
    {
       return res.status(400).send({message:"So you are not allowed to create an admin userType"})
    }
}





const validateSignInRequest = (req, res) =>{
   if(!req.body.userId)
   {
    return res.status(400).send({message:"UserId is not provided"})
   }
   if(!req.body.password)
   {
    return res.status(400).send({message:"Password is not provided"})
   }
}

module.exports ={
    validateSignUpRequest,
    validateSignInRequest
}