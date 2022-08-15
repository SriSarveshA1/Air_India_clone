const reviewController=require("../controllers/review.controller");
const {reviewValidator,authValidator,onlyAdmin_or_user_created}=require("../middlewares/index");

/*
 So here updating the review and deleteing the review should only be performed by the 
  1.user who created the review
   or
  2.Admin
*/


module.exports=(app)=>{

    //So using this particular route we can be able to create the route.
                   
    app.post("/flightBooker/api/v1/review",[authValidator.tokenValidator,reviewValidator.reviewValidator],reviewController.createReview);//Any logged in user can create the review

    //So using this particular route we can be able to get all the reviews of a particular  _id_of_user or we can be able to get all the reviews of a flight
    app.get("/flightBooker/api/v1/review/",[authValidator.tokenValidator],reviewController.getAllReviews);//Any logged in user can get all the reviews



    //So using this particular route we can delete a review (1.Admin and 2.User who created the app)
    app.delete("/flightBooker/api/v1/review/:_id",[authValidator.tokenValidator,authValidator.isAdmin,reviewValidator.onlyAdmin_or_user_created],reviewController.destroyReview);

    //So using the route we can update a review with the _id  (1.Admin and 2.User who created the app)
    app.put("/flightBooker/api/v1/review/:_id",[authValidator.tokenValidator,authValidator.isAdmin,reviewValidator.onlyAdmin_or_user_created],reviewController.updateReview);

}