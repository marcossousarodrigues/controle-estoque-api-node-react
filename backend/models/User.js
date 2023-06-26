const { DataTypes } = require('sequelize')

const Product = require('./Product');
const db = require('../db/conn')

const User = db.define('User',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    
    blocked: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    
    password: {
         type: DataTypes.STRING,
         allowNull: false,
         require: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        require: false
    }
})

Product.belongsTo(User)
User.hasMany(Product)

module.exports = User