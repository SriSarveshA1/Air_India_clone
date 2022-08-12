
const mongoose=require('mongoose');//so this mongoose odm is used to createschema and various other things with mongodb
const constants=require('../utils/constants');

const userSchema=new mongoose.Schema({//so this mongoose.Schema is another object that is used to create schema into which we need to pass the schema

    name:{
        type: String,
        required: true
    },
    userId:{//This field should be unique for each user
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        lowercase: true,//so when the email is going to get stored in the db it will be stored in the lowercase  ,
        minLength : 10,
        unique : true
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
    },
    userType:{
        type:String,
        default:constants.userTypes.customer,
        enum:[constants.userTypes.customer,constants.userTypes.admin]//so we have this admin type user ,and this type of user will be created only through programatically and not through rest api calls.
    }
})

module.exports=mongoose.model('user',userSchema);//the the model name is user