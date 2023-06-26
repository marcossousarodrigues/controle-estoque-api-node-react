
const Contact = require('../models/Contact');

module.exports = async (id, name, surname, email, emailTwo, phone, phoneTwo, birthday, comments)=>{
    let validate = false;

    try
    {
        const contact = await Contact.findOne({where:{id: id}})
       
        if(contact.name != name)
        {   
            validate = true
        }
        else if(contact.surname != surname)
        {
            validate = true
        }
        else if(contact.email != email)
        {
            validate = true
        }
        else if(contact.emailTwo != emailTwo)
        {
            validate = true
        }
        else if(contact.phone != phone)
        {
            validate = true
        }
        else if(contact.phoneTwo != phoneTwo)
        {
            validate = true
        }
        else if(contact.birthday != birthday)
        {
            validate = true
        }
        else if(contact.comments != comments)
        {
            validate = true
        }

        return {validate: validate}
    }
    catch(erro)
    {
        return "ocorreram erros durante a operação";
    }
   

}