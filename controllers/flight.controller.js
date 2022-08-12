const Flight=require("../models/flight.model");

exports.createFlight=async (req,res)=>{

    try{
           const newFlight={
            departureAirport:req.body.departureAirport,
            arrivalAirport:req.body.arrivalAirport,
            duration:req.body.duration,
            flightDate:req.body.flightDate,
            departureTime:req.body.departureTime,
            flightNumber:req.body.flightNumber,
            price:req.body.price,
            airLineBelongs:req.body.airLineBelongs//has the id of the airline so we can refer to it
           }
           //so generally while creating a flight detail we dont store the boardingGate ,we try to store it while updating the flight
           const flight =await Flight.create(newFlight);

           return res.status(201).send(flight);
    }
    catch(err){
           return res.status(500).send({message:err.message});
    }
}

exports.destroyFlight=async (req,res)=>{
    try{
                   
        const flight = await Flight.deleteOne({flightNumber:req.params.flightNumber});//so using this unique flight number we are able to find the flight and delete it
        return res.status(200).send(flight);

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}

exports.getFlight=async (req, res) =>{
    try{
        const flight = await Flight.findOne({flightNumber:req.params.flightNumber});//this will be returning the flight that has flightNumber which is passed
        return res.status(200).send(flight);
    }
    catch(err) {
        return res.status(500).send({message:err.message});
    }
}

exports.getAllFlights=async (req, res) =>{
    try{
        const allFlights = await Flight.find(); //so this will be returning all the flights
        return res.status(200).send(allFlights);
    }
    catch(err)
    {
        return res.status(500).send({message:err.message});
    }
}

exports.updateFlight=async (req, res) =>{

    try{
         
        //we will be having an object that will be having the updated content.
        
        const updatedData={
            departureAirport:req.body.departureAirport,
            arrivalAirport:req.body.arrivalAirport,
            duration:req.body.duration,
            flightDate:req.body.flightDate,
            departureTime:req.body.departureTime,
            flightNumber:req.body.flightNumber,
            price:req.body.price,
            airLineBelongs:req.body.airLineBelongs
        };

        const flight = await Flight.updateOne({flightNumber:req.params.flightNumber},data)
        return res.status(200).send(flight);

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}
