
const flightController=require("../controllers/flight.controller");
module.exports=(app) => {


    /*
     1.So we need to create a middleware that checks whether an Airline already exists before creating an flight
     2.Only logged in users should be allowed to access these routes.
    */

    //This route will help us to create the flight
    app.post("/flightBooker/api/v1/flight/",flightController.createFlight);

    //This route will help us to delete the flight (the particular flight that we want to delete)
    app.delete("/flightBooker/api/v1/flight/:flightNumber",flightController.destroyFlight);

    //This route will help us to get the particular flight that we want to get 
    app.get("/flightBooker/api/v1/flight/:flightNumber",flightController.getFlight);

    //This route will help us to get the all the flights details that are available
    app.get("/flightBooker/api/v1/flight/",flightController.getAllFlights);

    //This route will help us to update the flight details that are available
    app.put("/flightBooker/api/v1/flight/:flightNumber",flightController.updateFlight);


}