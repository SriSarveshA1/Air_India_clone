const Flight=require("../models/flight.model");

exports.createFlight=async (req,res)=>{

    try{
           const newFlight={
            departureAirport:req.body.departureAirport,
            arrivalAirport:req.body.arrivalAirport,
            duration:req.body.duration,
            flightDate:req.body.flightDate,
            departureTime:req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
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


//So Either we get all the flight details 
// Or
// 1.We sort the flights array based on the price
// 2.We sort the flights array based on the duration
exports.getAllFlights=async (req, res) =>{
    try{
        let allFlights = await Flight.find(); 
        //so we initially sort based on price or duration
        if(req.query.price&&req.query.sort)
        {
            //so price should be having some value and sort=true should be there.
            if(req.query.sort_asc)
            {
                //So if sort_asc is true we sort it in ascending order 
                allFlights=allFlights.sort(function(a,b){
                    return a.price-b.price;
                })
                return res.status(200).send(allFlights);
            }
            else{
                //So if sort_des is true we sort it in descending order 
                      if(req.query.sort_des)
                     {
                        //So if sort_asc is true we sort it in ascending order 
                          allFlights=allFlights.sort(function(a,b){
                               return b.price-a.price;
                          })
                         return res.status(200).send(allFlights);
                     }
                      else{
                            //iF any query is not passed.
                           return res.status(200).send(allFlights);
                        }
                 }
            
        }
        else{
            if(req.query.duration &&req.query.sort)
            {
                //so price should be having some value and sort=true should be there.
                if(req.query.sort_asc)
                {
                    allFlights=allFlights.sort(function(a,b){
                        return a.duration-b.duration;
                    })
                    return res.status(200).send(allFlights);
                }
                else{
                    if(req.query.sort_desc)
                    {
                        allFlights=allFlights.sort(function(a,b){
                            return b.duration-a.duration;
                        })
                        return res.status(200).send(allFlights);
                        
                    }
                    else{
                        //so this will be returning all the flights if any query is not properly passed
                        return res.status(200).send(allFlights);
                    }
                }
              
            }
            else{
                  //So we can also get the details of the flights whose price is less than (certain value) or greater than(certain value)
                     if(req.query.price&&req.query.lt)
                    {
                        //so here we try to retrive the details based  price lesser than certain value.
                        allFlights=await Flight.find({price:{$lt:req.query.price}});
                        return res.status(200).send(allFlights);
                    }
                    else{
                        if(req.query.price&&req.query.gt)
                        {
                             //so here we try to retrive the details based  price greater than certain value.
                        allFlights=await Flight.find({price:{$gt:req.query.price}});
                        return res.status(200).send(allFlights);

                        }
                        else{
                            if(req.query.duration&&req.query.lt)
                            {
                                allFlights=await Flight.find({duration:{$lt:req.query.duration}});
                                return res.status(200).send(allFlights); 
                            }
                            else{
                                if(req.query.duration&&req.query.gt)
                                {
                                    allFlights=await Flight.find({duration:{$gt:req.query.duration}});
                                    return res.status(200).send(allFlights);
                                }
                                else{
                                     //so this will be returning all the flights 
                                      return res.status(200).send(allFlights);
                                }
                            }
                        }
                      
                    }
                
            }
          
        }
      
       
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

        let flight = await Flight.updateOne({flightNumber:req.params.flightNumber},updatedData);
        flight=await Flight.findOne({flightNumber:req.params.flightNumber});
        return res.status(200).send(flight);

    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}
