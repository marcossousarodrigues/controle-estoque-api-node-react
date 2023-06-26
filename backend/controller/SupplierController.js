
const Supplier = require('../models/Supplier')

module.exports = 
class SupplierController{
     

    static async get(req, res)
    {
        try
        {
           const suppliers = await Supplier.findAll();
           return res.status(200).json({suppliers});
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
        const {name, fantasy, email, cnpj, cep, address, number, neighborhood, state, county, blocked} = req.body

        const supplier = {
            name, fantasy, email, cnpj, cep, address, number, neighborhood, state, county, blocked
        }

        try
        {
            await Supplier.create(supplier);
            
            res.status(201).json({
                message: "Fornecedor cadastrado com success",
                status: 'success',
                supplier: supplier
            });
        }
       catch(error)
       {
            res.status(501).json({
                message: "Ocorreram erros durante a requisição",
                status: 'error'
            });
       }

    }

    static async update(req, res)
    {
        const id = req.params.id
        const {name, fantasy, email, cnpj, cep, address, number, neighborhood, state, county, blocked} = req.body

        const supplier = {
            name, fantasy, email, cnpj, cep, address, number, neighborhood, state, county, blocked
        }

        try
        {
            await Supplier.update(supplier, {where: {id: id}})
            
            return res.status(200).json({
                message: "Fornecedor atualizado com sucesso",
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
            await Supplier.destroy({where:{id: id}})
            return res.status(200).json({
                message: "Fornecedor deletado com sucesso",
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