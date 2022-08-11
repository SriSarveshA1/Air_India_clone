

const authController =require("../controllers/auth.controller");
module.exports=(app)=>{

    app.post("/airIndia/api/v1/auth/signup",authController.signup);
    app.post("/airIndia/api/v1/auth/signin",authController.signin);
}