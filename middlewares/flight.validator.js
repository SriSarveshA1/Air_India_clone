const Flight=require("../models/flight.model");
const AirLine=require("../models/airline.model");
const validateFlightRequest =async (req,res,next) =>{
    if(!req.body.flightNumber){
        return res.status(400).send({message:"FlightNumber is required"});
    }
    if(req.body.flightNumber)
    {
      const flight= await Flight.findOne({flightNumber:req.body.flightNumber});
      //so if a flight already exists with the given flightNumber we should tell the user to send another number
      if(flight)
      {
        return res.status(400).send({message:"FlightNumber already exists"});  
      }
    }
    if(!req.body.price){
        return res.status(400).send({message:"Price is required"});
    }
    if(!req.body.departureAirport)
    {
        return res.status(400).send({message:"DepartureAirport is required"})
    }
    if(!req.body.arrivalAirport)
    {
        return res.status(400).send({message:"ArrivalAirport is required"})
    }
    if(!req.body.duration)
    {
        return res.status(400).send({message:"Duration is required"})
    }
    if(!req.body.airLineBelongs)
    {
        return res.status(400).send({message:"AirLineBelongs is required"})
    }
    if(req.body.airLineBelongs)
    {
        const airLine=await AirLine.findOne({_id:req.body.airLineBelongs});
        if(!airLine)
        {
            return res.status(400).send({message:"AirLine is not registered so give an airline which is already registered"});
        }
        else{
            
            next();
        }

    }
}
module.exports={
    validateFlightRequest
}