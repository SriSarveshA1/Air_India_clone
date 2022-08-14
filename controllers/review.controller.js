const Review=require("../models/review.model");

exports.createReview=async (req, res) =>{
    try{
        console.log("zzzz")
     const newReview={
        _id_of_user:req.body._id_of_user,//_id of the user model
        comment:req.body.comment,
        _id_of_flight:req.body._id_of_flight//_id of the flight model
     }
     const review=await Review.create(newReview);
     res.status(201).send(review);

    }
    catch(err)
    {
      res.status(500).send({message: err.message});
    }
}

//We are getting all the reviews
exports.getAllReviews=async (req, res) =>{
    console.log(".....")
    try{
        //This will get all the reviews for a particular flight or through the id of the user
        let review;
         if(req.query._id_of_user)
         {
           review=await Review.find({_id_of_user:req.query._id_of_user})
           res.status(200).send(review);
         }
         else{
            if(req.query._id_of_flight)
            {
                review=await Review.find({_id_of_flight:req.query._id_of_flight});
                res.status(200).send(review);
            }
            else{
                review=await Review.find();//Find all the reviews
                res.status(200).send(review);
            }
         }
    }
    catch(err)
    {
        res.status(500).send({message: err.message});
    }
}

//we are destroying the particular document of the review based on the _id
exports.destroyReview=async (req, res) =>{
    try{
        const review= await Review.deleteOne({_id:req.params._id});
        res.status(200).send(review);
    }
    catch(err)
    {
        res.status(500).send({message:err.message});
    }
}

exports.updateReview=async (req, res) => {
    try{

        const updatedReview={
            _id_of_user:req.body._id_of_user,//_id of the user model
             comment:req.body.comment,
            _id_of_flight:req.body.id_of_flight//_id of the flight model
        }
        const review = await Review.updateOne({_id:req.params._id},updatedReview);
        res.status(200).send(review);
    }
    catch(err)
    {
        res.status(500).send({message: err.message});
    }
}