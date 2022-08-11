
const User=require("../models/user.model");
const secretConfig=require("../configs/secret.config");


const bcrypt=require("bcrypt");//used for hashing the password
const jwt=require("jsonwebtoken");//used for generating token


exports.signup=async (req,res)=>{
     //so initially we will be having user details in the request body we try to retrive from the body 
     const userObj={
        name:req.body.name,
        userId:req.body.userId,//This field should be unique for each user   
        password:bcrypt.hashSync(req.body.password,8),//so we want this hashing line to be executed in syncronously and the salt valuue that we passed is 8(it can be either numeric or string)
        email:req.body.email,
        userType:req.body.userType//so this userType should only be "CUSTOMER" because 
     }
      
     try{
        const user=await User.create(userObj);
        const response={//so we can only send certain data as response 
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType
        }
        res.status(201).send(response);//successfully user created
     }
     catch(err){
        res.status(500).send({message:err.message});
     }
  
}

exports.signin=async (req, res) =>{
    /*
      Here the user can login either through the userId or through the email
      1.so we check whether there is already an account with the given userId or email
      2.If not we return user not found
      3.Then we go for password checking if not correct we return password not correct
      4.Then we try to generate token and send the token
    */
   try{
    let user;
    if(req.body.userId==undefined)
    {
        //then email will be present
        user=await User.findOne({ email: req.body.email});
    }
    else{
        //userId wll be present
        user=await User.findOne({userId: req.body.userId});
    }

    if(!user)
    {
        //so even through both if there is no user exists then we return unauthorized
        return res.status(404).send({message:"User not found"});
    }
    
    const isPasswordValid=bcrypt.compareSync(req.body.password,user.password);
    if(!isPasswordValid)
    {
        //if this is false then password doesn't match so we try to return incorrect password
        return res.status(401).send({message:"Password is incorrect"});
    }
    //so generally jwt signin takes public info,secret data,expiry time
    const token=jwt.sign({
        id:user.userId
    },secretConfig.secret,
    {
        expiresIn:60000
    }
    )

    //so now we need to return the response object with the token
    const resObj={
        userId:user.userId,
        Jwttoken:token
    }
    res.status(200).send(resObj);
   }
   catch(err) {

    res.status(500).send({message: err.message});
    
   }
}