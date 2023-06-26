
const Contact = require('../models/Contact');

module.exports = async (email, userId, id = undefined )=>{
    try
    {
        const contactEmail = await Contact.findOne({where:{email: email, UserId: userId}})
        if(contactEmail && contactEmail.id != id)
        {   
            return true
        }

        const contactEmailTwo = await Contact.findOne({where:{emailTwo: email, UserId: userId}})
        if(contactEmailTwo && contactEmailTwo.id != id)
        {   
            return true
        }
        else
        {
            return false
        }
        
    }
    catch(erro)
    {
        return "ocorreram erros durante a operação";
    }
   
    
}