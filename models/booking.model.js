const mongoose=require('mongoose');
const constants=require("../utils/constants");

const bookingSchema=new mongoose.Schema({
    booking_id:{//This is the unique booking id
        type:Number,
        required:true,
        unique:true
    },
    _id_of_user:{//which user have made the booking
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    _id_of_flight:{//so we need to specify the flight details and from that we can get the airLines details from it.
        type:mongoose.Schema.Types.ObjectId,
        ref:"flight",
        required:true
    },
    status:{//so we have 3 different status of booking 
        type:String,
        required:true,
        default:constants.status.inProcess,
        enum:[constants.status.inProcess, constants.status.booked,constants.status.cancelled]
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

module.exports=mongoose.model("Booking",bookingSchema);