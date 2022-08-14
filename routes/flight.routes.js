
const flightController=require("../controllers/flight.controller");
module.exports=(app) => {


    /*
     1.So we need to create a middleware that checks whether an Airline already exists before creating an flight
     2.Only logged in users should be allowed to access these routes.
     3.Implementing the middleware that allowes only admin to access certain routes.
    */

    //This route will help us to create the flight (Only ADMIN should be able to access this route)
    app.post("/flightBooker/api/v1/flight/",flightController.createFlight);

    //This route will help us to delete the flight (the particular flight that we want to delete) (Only ADMIN should be able to access this route)
    app.delete("/flightBooker/api/v1/flight/:flightNumber",flightController.destroyFlight);

    //This route will help us to get the particular flight that we want to get 
    app.get("/flightBooker/api/v1/flight/:flightNumber",flightController.getFlight);

    
    //This route will help us to get certain flights based on the filter criteria(if query param is passed) && This route will help us to get the all the flights details that are available(If no query param is passed)
    //And also We can get the flights based upon price on certain range
    //And also we can get the flights based upon duration on certain range
    app.get("/flightBooker/api/v1/flight/",flightController.getAllFlights);


    //This route will help us to update the flight details that are available (Only ADMIN should be able to access this route)
    app.put("/flightBooker/api/v1/flight/:flightNumber",flightController.updateFlight);


}