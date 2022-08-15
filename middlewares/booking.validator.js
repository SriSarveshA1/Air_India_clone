const Booking=require("../models/booking.model");
const constants=require("../utils/constants");
const User=require("../models/user.model");


const validateBookingRequest=async (req, res,next) => {
    if(!req.body.booking_id)
    {
        return res.status(400).send({message:"booking id is not specified"})
    }
    if(req.body.booking_id)
    {
        const booking=await Booking.findOne({booking_id:req.body.booking_id});
        if(booking)
        {
            return res.status(400).send({message:"There is booking with same id "})
        }
    }
    if(!req.body._id_of_user)
    {
        return res.status(400).send({message:"id of the user is not specified"});
    }
    if(!req.body._id_of_flight)
    {
        return res.status(400).send({message:"flight id is not specified"});
    }
    else{
        next();
    }
    
}

const if_status_is_booked=async (req, res,next)=>{
    //so if someone tries to put the status=booked has to be admin to that
    if(req.body.status&&(req.body.status==constants.status.booked))
    {
        const user=await User.findOne({userId:req.userId});

        if(!user){
         return res.status(403).send({message:"User not found"})
        }
        if(user.userType!=constants.userTypes.admin)
        {
             return res.status(403).send({message:"Only admin are allowed to set the status to booked"});
        }
        else{
           
            
          next();//If incase if the user is admin
        }
    }
    else{
        next();
    }
}

const onlyAdmin_or_user_created=async (req, res,next) => {
    try{

        const booking=await Booking.findOne({booking_id: req.params.booking_id});//so we are retriving the review from the id passed in the params
        const user=await User.findOne({_id:booking._id_of_user});//from the review we have _id_of_user who created and we try to get the user info from that
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
    validateBookingRequest,
    if_status_is_booked,
    onlyAdmin_or_user_created
}