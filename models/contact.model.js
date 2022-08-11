const mongoose=require('mongoose');//so this mongoose odm is used to createschema and various other things with mongodb

const contactSchema=new mongoose.Schema({//so this mongoose.Schema is another object that is used to create schema into which we need to pass the schema
    //The peron who wants to contact the airIndia team should send these following things.
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

});


module.exports=mongoose.model('contacts',contactSchema);