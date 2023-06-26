
const Product = require('../models/Product');

module.exports =
class ProdutoController
{
    static async products(req, res)
    {
        const product = await Product.findAll();

        res.json(product)
    }

    static getProductById(req, res)
    {

    }

    static async post(req, res)
    {
        const {
            name, description, brand, weight, unit, category, 
            supplier, price, amount, total, manufacturing_date, 
            expiration_date, SupplierId, CategoryId, UnitId, UserId 
        } = req.body;

        const product = {
            name, description, brand, weight, unit, category, 
            supplier, price, amount, total, manufacturing_date, 
            expiration_date, SupplierId, CategoryId, UnitId, UserId 
        }

        if(!name)
        {
            return res.status(300).json({
                message: "Campo nome é obrigatorio"
            });
        }

        if(!brand)
        {
            return res.status(300).json({
                message: "Campo marca é obrigatorio"
            });
        }

        if(!price)
        {
            return res.status(300).json({
                message: "Campo price é obrigatorio"
            });
        }

        try{
            await Product.create(product);

            return res.status(201).json({
                message: "Produto cadastrado com sucesso"
            });
        }
        catch(error)
        {
            return res.status(501).json({
                message: "Ocorreram erros no processo"
            });

        }
        
    }

    static async update(req, res)
    {
        const productId = req.params.id;

        const {
            name, description, brand, weight, unit, category, 
            supplier, price, amount, total, manufacturing_date, 
            expiration_date, SupplierId, CategoryId, UnitId, UserId 
        } = req.body;

        const product = {
            name, description, brand, weight, unit, category, 
            supplier, price, amount, total, manufacturing_date, 
            expiration_date, SupplierId, CategoryId, UnitId, UserId 
        }

        await Product.update(product, {where:{id: productId}});
        
        return res.json({id: productId, product: product});

    }

    static async delete(req, res) {
        const id = req.params.id
        
        try{
            await Product.destroy({where:{id:id}})
            return res.json({
                message: "Registro deletado com sucesso"
            })
        }catch(error)
        {
            return res.json({
                message: "Ocorreram erros durante a operação"
            })
        }
        
    }

}