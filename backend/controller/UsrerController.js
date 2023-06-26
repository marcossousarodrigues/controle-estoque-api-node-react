
const bcript = require('bcryptjs');
const User = require('../models/User')
const createUserToken = require('../helpers/create-user-token')

module.exports =
class UserController{


    static async findUserById(req, res)
    {
        const id = req.params.id;

        try{
            const user = await User.findOne({where:{id: id}});
            if(user.blocked === true)
            {
                user.blocked = '1'
            }
            return res.json({user: user})
        }
        catch(error)
        {
            return res.json({message: "Ocorreram erros durate a requisição"});
        }
        
    }

    static async findUser(req, res)
    {

        try
        {
            const user = await User.findAll({raw: true});

            if(user.blocked)
            {   
                user.blocked = '1'
                console.log(user.blocked)
            }

            return res.status(200).json({user: user, status: "success"})
        }
        catch(error)
        {
            return res.json({
                message: "Ocorreram erros durante a requisição",
                error: "error"
            });
        }
      

    }

    static async post(req, res)
    {
        const {name, email, permission, blocked, password, confirmpassword} = req.body

        let image = ''
        
        if(req.file)
        {
            image = req.file.filename
        }

        if(!name)
        {
            return res.json({
                message: "O campo nome é obrigatorio!",
                error: "error"
            });
        }
        else if(!email)
        {
            return res.json({
                message: "O campo email é obrigatorio!",
                error: "error"
            });

        }
        else if(!password)
        {
            return res.json({
                message: "O campo senha é obrigatorio!",
                error: "error"
            });

        }
        else if(!confirmpassword)
        {
            return res.json({
                message: "O campo confirma senha é obrigatorio!",
                error: "error"
            });

        }
        else if(password !== confirmpassword)
        {
            return res.json({
                message: "Senhas não conferem!",
                error: "error"
            });

        }
        
        // check if user exits
        const existEmailUser = await User.findOne({where:{email: email}});

        if(existEmailUser)
        {   
            return res.json({
                message: "Email já cadastrado, por favor usar outro e-mail!",
                error: "error"
            });

        }

        // create password
        const salt = await bcript.genSalt(12)
        const passwordHash = await bcript.hash(password, salt)

        const user = {
            name, email, permission, blocked, password: passwordHash, image
        }

        try{
            const newUser = await User.create(user);

            await createUserToken(newUser, req, res);

        }
        catch(error)
        {
            return res.json({message: "Ocorrem erros durate a operação "+error, error: "error"})
        }
        
    }

    static async login(req, res)
    {
        const {email, password} = req.body

        if(!email)
        {
            return res.json({
                message: "O campo e-mail é obrigatorio",
                error: 'error'
            })
        }
        else if(!password)
        {
            return res.json({
                message: "O campo senha é obrigatorio",
                error: 'error'
            })
        }
       
        const user = await User.findOne({where:{email: email}});

        if(!user)
        {
            return res.json({
                message: "Usuário não autenticado",
                error: 'error'
            })
        }
        
        console.log(user.blocked)
        if(user.blocked !== '2')
        {
            return res.json({
                message: "Usuário bloqueado, por favor, solicitar o desbloqueio ao administrador do sistema.",
                error: 'error'
            })
        }

        const checkPassword = await bcript.compare(password, user.password)

        if(!checkPassword)
        {
            return res.json({
                message: "Senha invalida!",
                error: "error"
            })
        }
        else
        {   
            await createUserToken(user, req, res);
        }
        
    }


    static async update(req, res)
    {
        const { userid, name, email, permission, blocked, password, confirmpassword} = req.body

        let image = ''
        
        if(req.file)
        {
            image = req.file.filename
        }

        if(!name)
        {
            return res.json({
                message: "O campo nome é obrigatorio!",
                error: "error"
            });
        }
        else if(!email)
        {
            return res.json({
                message: "O campo email é obrigatorio!",
                error: "error"
            });

        }
      
     
       
        // check if user exits
        const existEmailUser = await User.findOne({where:{email: email}});

    
        if(existEmailUser)
        {   
            if(userid != existEmailUser.id)
            {
                return res.json({
                    message: "Email já cadastrado, por favor usar outro e-mail!",
                    error: "error"
                });
            }
           
        }

        // check if user exits
        // const findUser = await User.findOne({where:{id: userid}});

        // if(password != findUser.password)
        // {
        //     return res.json({
        //         message: "Senha invalida!",
        //         error: "error"
        //     });   
        // }

        // const checkPassword = await bcript.compare(password, findUser.password)

        // if(!checkPassword)
        // {
        //     return res.json({
        //         message: "Senha invalida",   
        //         error: "error"
        //     })
        // }

        if(!image)
        {
            image = findUser.image
        }
        
        const user = {
            name, email, permission, blocked, image
        }

        try{
            
            await User.update(user, {where:{id: userid}});
            // user.id = userid

            // await createUserToken(user, req, res);

        }
        catch(error)
        {
            return res.json({message: "Ocorrem erros durate a operação", error: "error"})
        }
    }

    static async updatePassword(req, res)
    {
        const { userid, password, newpassword} = req.body
        if(!password)
        {
            return res.json({
                message: "A senha atual é necessaria para a redefinição da senha!",
                error: "error"
            });
        }
        else if(!newpassword)
        {
            return res.json({
                message: "A nova senha é necessaria para a redefinição da senha!",
                error: "error"
            });
        }
        else if(password == newpassword)
        {
            return res.json({
                message: "A senha atual e a nova senha não podem ser iguais!",
                error: "error"
            });
        }

          // check if user exits
        const findUser = await User.findOne({where:{id: userid}});


        const checkNewPassword = await bcript.compare(newpassword, findUser.password)
        if(checkNewPassword)
        {
            return res.json({
                message: "A senha atual e a nova senha não podem ser iguais!",
                error: "error"
            });
        }

        const checkPassword = await bcript.compare(password, findUser.password)

        if( (findUser.password != password) && !checkPassword )
        {
            return res.json({
                message: "Senha atual invalida",
                error: "error"
            })
        }
        
         // create password
        const salt = await bcript.genSalt(12)
        const passwordHash = await bcript.hash(newpassword, salt)
 

        const user = {
            password: passwordHash
        }

        try{
            
            await User.update(user, {where:{id: userid}});
            user.id = userid

            await createUserToken(findUser, req, res);

        }
        catch(error)
        {
            return res.json({message: "Ocorrem erros durate a operação", error: "error"})
        }


    }

    static async destroy (req, res)
    {
        const id = req.params.id;
        
        try
        {
           await User.destroy({where:{id: id}})
           res.json({
            message: "Usuáiro deletado com sucesso",
            status: "success"
           })
        }
        catch(error)
        {
        }
    }
    
}