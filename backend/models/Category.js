const { DataTypes } = require('sequelize');

const Product = require('./Product');

const db = require('../db/conn');

const Category = db.define("Category", {
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

Product.belongsTo(Category)
Category.hasMany(Product)

module.exports = Category;