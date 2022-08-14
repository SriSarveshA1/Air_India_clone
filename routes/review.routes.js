const reviewController=require("../controllers/review.controller");

/*
 So here updating the review and deleteing the review should only be performed by the 
  1.user who created the review
   or
  2.Admin
*/


module.exports=(app)=>{

    //So using this particular route we can be able to create the route.
    app.post("/flightBooker/api/v1/review",reviewController.createReview);

    //So using this particular route we can be able to get all the reviews of a particular  _id_of_user or we can be able to get all the reviews of a flight
    app.get("/flightBooker/api/v1/review/",reviewController.getAllReviews);



    //So using this particular route we can delete a review 
    app.delete("/flightBooker/api/v1/review/:_id",reviewController.destroyReview);

    //So using the route we can update a review with the _id
    app.put("/flightBooker/api/v1/review/:_id",reviewController.updateReview);

}