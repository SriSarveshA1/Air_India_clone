const contactController = require("../controllers/contact.controller");

module.exports=(app)=>{
    
    app.post("/flightBooker/api/v1/contact",contactController.createContact);
}