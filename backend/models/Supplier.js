const { DataTypes } = require('sequelize');

const Product = require('./Product');

const db = require('../db/conn');

const Supplier = db.define("Supplier", {
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    fantasy:{
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    county: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    blocked: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    }
});


Product.belongsTo(Supplier)
Supplier.hasMany(Product)

module.exports = Supplier;