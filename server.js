const express=require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.configs');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');





const constants=require("./utils/constants");
const User=require("./models/user.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');


mongoose.connect(dbConfig.DB_URL);//so we are connected to this DB_URL
const db=mongoose.connection;//and the db is holding this currently connected db connection

db.on("error", () => {   //This event handler is for the error handling
    console.log("Error while connecting to MongoDB");
});

db.once("open",()=>{//so when the mongodb connection is open
    console.log("Connected to mongoDB");
    init();

})


//This part of code creates an admin user (there should be only one admin so it creates if no admin user is present previously)
var init= async function(){

    let user=await User.findOne({userId:"admin"});
    if(user){
        //If user already exists then we dont create another Admin type user
        console.log("Admin User already exists")
    }
    else{
        const adminUser={
            name:"SriSarvesh.R",
            userId:"admin",//This field should be unique for each user   
            password:bcrypt.hashSync("welcome_1",8),
            email:"r.srisarvesh@gmail.com",
            userType:constants.userTypes.admin
        }
        user=await User.create(adminUser);
        console.log(user);
    }
}

require("./routes/auth.routes")(app);
require("./routes/airLine.routes")(app);
require("./routes/flight.routes")(app);
require("./routes/review.routes")(app);
require("./routes/booking.routes")(app);
require("./routes/contact.routes")(app);



app.listen(serverConfig.PORT,()=>{
    console.log("Server is running on port " + serverConfig.PORT);
})