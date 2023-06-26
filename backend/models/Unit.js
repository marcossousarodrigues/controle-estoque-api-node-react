
const { DataTypes } = require('sequelize');

const Product = require('./Product');

const db = require('../db/conn');

const Unit = db.define("Unit", {
    name:{
        type: DataTypes.STRING,
        allowNull: true,
        require: true,
    },
    description:{
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


Product.belongsTo(Unit)
Unit.hasMany(Product)

module.exports = Unit;