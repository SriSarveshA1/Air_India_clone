const Booking=require("../models/booking.model");
const constants=require("../utils/constants");


exports.createBooking=async (req, res) =>{
    try{
        const newBooking={
            booking_id:req.body.booking_id,
            _id_of_user:req.body._id_of_user,
            _id_of_flight:req.body._id_of_flight,
           };
           const booking=await Booking.create(newBooking);//So while booking the ticket the status of the ticket will be in "in progress"
           return res.status(201).send(booking);
    }
    catch(err) {
        return res.status(500).send({ message:err.message});
    }

}


//so the user who created the booking can cancel it or the admin can cancel it
exports.cancelBooking=async (req,res) =>{
    try{
        const updatedDetails={
            status:constants.status.cancelled
        };
        //so we will be getting a booking details from the passed booking id in that we update this status
        const booking=await Booking.updateOne({booking_id:req.params.booking_id},updatedDetails);
        return res.status(200).send(booking);
    }
    catch(err) {
        return res.status(500).send({message:err.message});
    }

}
exports.boardingPass=async (req, res) =>{
    //so when the user who booked or the admin tries to fetch the boardingPass details they should be getting the flight Id 
   try{
       
       const boardingPassDetails=await Booking.findOne({booking_id:req.params.booking_id}).populate('_id_of_flight');
       res.status(200).send(boardingPassDetails);
   }
   catch(err){
       return res.status(500).send({message: err.message});
   }
}

//So the only admin should come and update the booking details and change the status of the booking from inprogress to Booked
exports.updateBooking=async (req, res) =>{
    try{
        const updatedDetails={
            status:constants.status.booked
        };
        //so we will be getting a booking details from the passed booking id in that we update this status
        const booking=await Booking.updateOne({booking_id:req.params.booking_id},updatedDetails);
        return res.status(200).send(booking);
    }
    catch(err) {
        return res.status(500).send({message:err.message});
    }
}

//Admin can delete all the booking details that have cancelled status.
exports.deleteBooking=async (req, res) =>{
    try{
        
        const bookings = await Booking.deleteMany({status:constants.status.cancelled});
        return res.status(200).send(bookings);
    }
    catch(err) {
        return res.status(500).send({message:err.message});
    }
}


exports.BookedTravelerDetails=async (req, res) =>{
    try{
        //so this _id_of_user helps to get the user infomation.
       let travellerDetails = await Booking.findOne({booking_id:req.params.booking_id}).populate('_id_of_user');
       //from that we are getting this particular information alone
       const {_id_of_user:{name,email}}=travellerDetails;


       return res.status(200).send({name,email});
    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}