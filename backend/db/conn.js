const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mercearia', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',

})

// const sequelize = new Sequelize('railway', 'root', 'MBJbY2J419PN30rqIXlf',{
//     host: 'containers-us-west-120.railway.app',
//     dialect: 'mysql',
//     port: 6553 // process.env.DB_POST,
// })



try
{
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
}
catch(err)
{
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize