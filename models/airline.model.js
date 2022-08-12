const mongoose=require('mongoose');

const airLineSchema=new mongoose.Schema({
    name:{
       type: String,
       required: true,
       unique: true
    },
    website:{
        type: String//we currently don't want the website name to be mandatory
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

module.exports=mongoose.model('airLine',airLineSchema);