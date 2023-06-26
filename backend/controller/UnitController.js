
const Unit = require('../models/Unit')

module.exports = 
class UnitController{
     
    
    static async get(req, res)
    {
        try
        {
           const units = await Unit.findAll();
           return res.status(200).json({units});
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
        const {name, description} = req.body

        const unit = {
            name, description
        }

        try
        {
            await Unit.create(unit);
            
            res.status(201).json({
                message: "Unidade de medida cadastrada com sucesso",
                status: 'success',
                unit: unit
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
        const unit = {
            name, description, blocked
        }

        try
        {
            await Unit.update(unit, {where: {id: id}})
            
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
            await Unit.destroy({where:{id: id}})
            return res.status(200).json({
                message: "Unidade de medida atualizada com sucesso",
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