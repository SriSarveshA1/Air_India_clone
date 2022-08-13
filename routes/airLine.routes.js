
const airLineController=require("../controllers/airLine.controller");
module.exports=(app) => {

    //This route will help us to create the airLine
    app.post("/flightBooker/api/v1/airLine/",airLineController.createAirline);

    //This route will help us to delete the airline (the particular airLine that we want to delete)
    app.delete("/flightBooker/api/v1/airLine/:id",airLineController.destroyAirLine);

    //This route will help us to get the particular airLine that we want to get 
    app.get("/flightBooker/api/v1/airLine/:id",airLineController.getAirLine);

    //This route will help us to get the all the airlines details that are available
    app.get("/flightBooker/api/v1/airLine/",airLineController.getAllAirLines);

    //This route will help us to update the airline details that are available
    app.put("/flightBooker/api/v1/airLine/",airLineController.updateAirLine);


}