const { findMedicoByEmail } = require("../../database/repositories/medico")
const { findMedicoEspecialidadesById } = require("../../database/repositories/medico_especialidade")
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
    let infosUser = await findMedicoByEmail(body)
    let especialidades = await findMedicoEspecialidadesById(infosUser.id)
    if(!infosUser || !compare(body.senha,infosUser.senha))
    return res.status(status.UNAUTHORIZED).json(errorResponse(
        'Falha no login!',
        'Login/senha incorreto.'
    ))
    const {senha, ...user} = infosUser
    user.especialidades = especialidades
    res.status(status.OK).json({token: generateToken({acesso: 'medico', id:user.id, email: user.email }),user:user})
})

