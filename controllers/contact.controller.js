const Contact=require("../models/contact.model");

exports.createContact=async (req, res) =>{
    try{

        const contactObj={
            name:req.body.name,
            email:req.body.name,
            subject:req.body.subject,
            message:req.body.message
        }
      const contact =await Contact.create(contactObj);
      res.status(201).send(contact);
    }
    catch(err)
    {
        res.status(500).send({ message: err.message});
    }
}

