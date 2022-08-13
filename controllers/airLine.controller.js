
const AirLine=require("../models/airline.model");

exports.createAirline=async (req,res)=>{
    try{
           const newAirLine={
            name:req.body.name,
            website:req.body.website
           }
           //so generally while creating a Airline detail we dont store the boardingGate ,we try to store it while updating the Airline
           const airLine =await AirLine.create(newAirLine);

           return res.status(201).send(airLine);
    }
    catch(err){
           return res.status(500).send({message:err.message});
    }
}

exports.destroyAirLine=async (req,res)=>{
    try{
                   
        const airLine = await AirLine.deleteOne({_id:req.params.id});// _id is unique for all documents we pass that thorugh the params

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}

exports.getAirLine=async (req, res) =>{
    try{
        const airLine = await AirLine.findOne({_id:req.params.id});
        return res.status(200).send(airLine);
    }
    catch(err) {
        return res.status(500).send({message:err.message});
    }
}

exports.getAllAirLines=async (req, res) =>{
    try{
        const allAirLines = await AirLine.find(); 
        return res.status(200).send(allAirLines);
    }
    catch(err)
    {
        return res.status(500).send({message:err.message});
    }
}

exports.updateAirLine=async (req, res) =>{

    try{
         
        //we will be having an object that will be having the updated content.
        
        const updatedData={
            name:req.body.name,
            website:req.body.website
        };

        let airLine = await AirLine.updateOne({_id:req.params.id},updatedData)
        airLine=await AirLine.findOne({_id:req.params.id});
        return res.status(200).send(airLine);

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}

exports.destroyAirLine=async (req, res) =>{

    try{
          const airLine=await AirLine.deleteOne({_id:req.params.id});
          return res.status(200).send(airLine);
    }
    catch(err){
          return res.status(500).send({message:err.message});
    }
}