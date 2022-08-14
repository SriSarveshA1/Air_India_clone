
const bookingController=require("../controllers/booking.controller");
module.exports=(app)=>{

    app.post("/flightBooker/api/v1/booking/",bookingController.createBooking);

    app.get("/flightBooker/api/v1/booking/:booking_id",bookingController.boardingPass);

    //Cancel the booking by changing the state---- only 1.User created 2.Admin
    app.post("/flightBooker/api/v1/booking/:booking_id",bookingController.cancelBooking);


    //update the booking status from in progress to booked----only 1.Admin
    app.put("/flightBooker/api/v1/booking/:booking_id",bookingController.updateBooking);

    //So when we want to delete all the bookings whose status is cancelled
    app.delete("/flightBooker/api/v1/booking/",bookingController.deleteBooking);

    //so when we want to get the traveller or the user who booked the ticket (of that particular booking Id)
    app.get("/flightBooker/api/v1/booking/traveler/:booking_id",bookingController.BookedTravelerDetails);

}