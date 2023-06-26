const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Product = db.define("Product", {
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    },
    brand:{
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        require: true,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    
    category: {
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    
    supplier: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        require: true,
    },
    
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        require: true,
    },

    total: {
        type: DataTypes.FLOAT,
        allowNull: true,
        require: true,
    },

    manufacturing_date: {
        type: DataTypes.DATE,
        allowNull: true,
        require: true,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
        require: true,
    },
    blocked: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    }
}
);


module.exports = Product;