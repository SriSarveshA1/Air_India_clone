const express=require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.configs');
const bodyParser = require('body-parser');

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
})

require("./routes/auth.routes")(app);
require("./routes/airLine.routes")(app);
require("./routes/flight.routes")(app);
require("./routes/review.routes")(app);




app.listen(serverConfig.PORT,()=>{
    console.log("Server is running on port " + serverConfig.PORT);
})