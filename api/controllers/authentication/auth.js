const { findMedicoByEmail } = require("../../database/repositories/medico")
const { controller } = require("../../presenters/controller")
const { compare } = require("../../presenters/encryptation")
const { status } = require("../../presenters/http")
const { generateToken } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateAuthBody } = require("./rules")


exports.middleware = [
    validateAuthBody,
    validateErrorBody
]

exports.post = controller(async({body:{email, senha }},res,)=>{
    console.log(email,senha)
    const user = await findMedicoByEmail(email)
    console.log(user.id)
    if(!user || compare(senha,user.senha))
    return res.status(status.UNAUTHORIZED).json(errorResponse(
        'Falha no login!',
        'Login/senha incorreto.'
    ))
    res.status(status.OK).json({token: generateToken({id: user.id})})
})