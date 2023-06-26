
const Category = require('../models/Category')

module.exports = 
class CategoryController{
     
    static async get(req, res)
    {
        try
        {
           const categorys = await Category.findAll();
           return res.status(200).json({categorys});
        }
        catch(error)
        {
            res.json({
                message: "Ocorreram erros durante a requisição",
                status: "error"
            })
        }
    }


    static async post(req, res)
    {
        const {name, description, blocked} = req.body

        const category = {
            name, description, blocked
        }

        try
        {
            await Category.create(category);
            
            res.status(201).json({
                message: "Categoria cadastrada com sucesso",
                status: 'success',
                category: category
            })
        }
       catch(error)
       {
         console.log(error)
       }

    }

    static async update(req, res)
    {
        const id = req.params.id
        const {name, description, blocked } = req.body
        const category = {
            name, description, blocked
        }

        try
        {
            await Category.update(category, {where: {id: id}})
            
            return res.status(200).json({
                message: "Update realizado com sucesso",
                status: "success"
            })
        }
        catch(error)
        {
            return res.status(500).json({
                message: "Ocorreram erros durante a requisição",
                status: "error"
            })
        }   

    }

    static async delete(req, res)
    {
        const id = req.params.id;
        try
        {   
            await Category.destroy({where:{id: id}})
            return res.status(200).json({
                message: "Categoria atualizada com sucesso",
                "status": "success"
            })
        }
        catch(error)
        {
            return res.status(500).json({
                message: "Ocorreram erros durate a requisição"
            })
        }
    }


}