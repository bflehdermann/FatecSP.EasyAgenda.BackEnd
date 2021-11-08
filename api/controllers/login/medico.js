const { findMedicoByEmail } = require("../../database/repositories/medico")
const { controller } = require("../../presenters/controller")
const { compare } = require("../../presenters/encryptation")
const { errorResponse } = require("../../presenters/handle")
const { status } = require("../../presenters/http")
const { generateToken } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateAuthBody } = require("./rules")


exports.middleware = [
    validateAuthBody,
    validateErrorBody
]

exports.post = controller(async({body},res,)=>{
    let user = await findMedicoByEmail(body)
    if(!user || !compare(body.senha,user.senha))
    return res.status(status.UNAUTHORIZED).json(errorResponse(
        'Falha no login!',
        'Login/senha incorreto.'
    ))
    res.status(status.OK).json({token: generateToken({ email: user.email, acesso: 'medico'})})
})