
const flightController=require("../controllers/flight.controller");
module.exports=(app) => {

    //This route will help us to create the flight
    app.post("/flightBooker/api/v1/flight/",flightController.createFlight);

    //This route will help us to delete the flight (the particular flight that we want to delete)
    app.delete("/flightBooker/api/v1/flight/:id",flightController.destroyFlight);

    //This route will help us to get the particular flight that we want to get 
    app.get("/flightBooker/api/v1/flight/:id",flightController.getFlight);

    //This route will help us to get the all the flights details that are available
    app.get("/flightBooker/api/v1/flight/",flightController.getAllFlights);

    //This route will help us to update the flight details that are available
    app.put("/flightBooker/api/v1/flight/",flightController.updateFlight);


}