const User=require("../models/user.model");
const Review=require("../models/review.model");

const reviewValidator=async (req, res,next)=>{
    try{
       if(!req.body._id_of_user)
       {
          return res.status(400).send({message:"id oth user is not present"})
       }
       if(!req.body.comment||req.body.comment.length<5)
       { 
          return res.status(400).send({message:"To make a review we must need a comment and that length should be greater than 5"})
       }
       if(!req.body._id_of_flight)
       {
          return res.status(400).send({message:"To make a review we must have the id of the flight"})
       }
       
       else{
        next();
       }

    }
    catch(err){
       return res.status(500).send({message: err.message});
    }
}

const onlyAdmin_or_user_created=async (req, res,next) => {
    try{

        const review=await Review.findOne({_id: req.params._id});//so we are retriving the review from the id passed in the params
        const user=await User.findOne({_id: review._id_of_user});//from the review we have _id_of_user who created and we try to get the user info from that
        if((user.userId==req.userId)||(req.userId=="admin")){//so the user should be the one who logged in or should be admin
             next();
        }
        else{
            return res.status(403).send({message:"You have to be either the admin or the user who created the review to do these operations"});
        }

    }
    catch(err)
    {
        return res.status(500).send({message:err.message});
    }
}

module.exports={
    reviewValidator,
    onlyAdmin_or_user_created
}