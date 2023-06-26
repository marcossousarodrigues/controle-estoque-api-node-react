
module.exports = (name, email, phone) =>{
    
    let next = true;
    let message = '';

    if(!name)
    {
        message = "O campo nome é obrigatorio";
        next = false;
    }
    else if(!email)
    {
        message = "O campo email é obrigatorio";
        next = false;
    }
    
    else if(!phone)
    {
        message = "O campo telefone é obrigatorio";
        next = false;
    }

    return {next, message}
    
}