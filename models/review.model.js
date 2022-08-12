const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        //so we are not making the required equal to true as the review can be given by anonymous user
    },
    comment:{
        type:String,
        required:true,
        minLength:5//So the comment should be minLength of 5
    },
    flight:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"flight",
        required:true
    },
    createdAt :{
        type : Date,
        immutable :true,
        default : () =>{ //method is needed to get new date everytime.
                    return Date.now()
        }
    },
    updatedAt :{
         type : Date,
         default : () =>{
                  return Date.now()
        }
    }

});

module.exports=mongoose.model("review",reviewSchema);