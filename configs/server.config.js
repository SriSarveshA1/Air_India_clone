if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();//SO THE CONTENT IN THE .env file is read as environmental variables;
}
module.exports ={
    PORT: process.env.PORT,
    NOTISERVE_LINK: process.env.NOTISERVE_LINK

}