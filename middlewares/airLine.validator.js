
const AirLine=require("../models/airline.model");

const validateAirLineRequest=async (req, res, next) => {

    try{

        if(!req.body.name)
        {
            return res.status(400).send({message:"Name should be provided"});
        }
        const airLine= await AirLine.find({name:req.body.name});
        if(airLine)
        {
            //if airline is already present we should not allow it
            return res.status(400).send({message:"Airline name already present give some other name"});
        }
        else{
            next();
        }
    }
    catch(err)
    {
        return res.status(500).send({message:err.message});
    }
}
module.exports={
    validateAirLineRequest
}