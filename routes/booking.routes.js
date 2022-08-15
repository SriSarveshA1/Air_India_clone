
const bookingController=require("../controllers/booking.controller");
const {authValidator,bookingValidator}=require("../middlewares/index");

/*
 1.so when user try to book the booking status should not be "booked" (we should ensure that in middleware)
*/

module.exports=(app)=>{

    app.post("/flightBooker/api/v1/booking/",[authValidator.tokenValidator,authValidator.isAdmin,bookingValidator.validateBookingRequest,bookingValidator.if_status_is_booked],bookingController.createBooking);

    /*
    -User who created the booking or the Admin
    */
    app.get("/flightBooker/api/v1/booking/:booking_id",[authValidator.tokenValidator,bookingValidator.onlyAdmin_or_user_created],bookingController.boardingPass);

    //Cancel the booking by changing the state---- only 1.User created 2.Admin
    app.post("/flightBooker/api/v1/booking/:booking_id",[authValidator.tokenValidator,bookingValidator.onlyAdmin_or_user_created],bookingController.cancelBooking);


    //update the booking status from in progress to booked----
    app.put("/flightBooker/api/v1/booking/:booking_id",[authValidator.tokenValidator,authValidator.isAdmin],bookingController.updateBooking);

    //So when we want to delete all the bookings whose status is cancelled
    app.delete("/flightBooker/api/v1/booking/",[authValidator.tokenValidator,authValidator.isAdmin],bookingController.deleteBooking);//Only the admin can do this action

    //so when we want to get the traveller or the user who booked the ticket (of that particular booking Id)  1.Only admin
    app.get("/flightBooker/api/v1/booking/traveler/:booking_id",[authValidator.tokenValidator,authValidator.isAdmin],bookingController.BookedTravelerDetails);

}