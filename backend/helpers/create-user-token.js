const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res)=>
{
    // create token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, "nossosecret");

    res.status(200).json({
        message: "você está autenticado!",
        token: token,
        userId: user.id,
        name: user.name,
        permission: user.permission
    })
}

module.exports = createUserToken;