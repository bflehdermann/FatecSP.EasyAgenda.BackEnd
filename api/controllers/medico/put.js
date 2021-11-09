const {status} = require('../../presenters/http')
const { validateMedicoBody, encryptPassword,checkAtualizacaoEmail} = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { validateAuthorization } = require('../../presenters/jwt')
const { findAndUpdateMedico, findMedicoByEmail } = require('../../database/repositories/medico')

exports.middleware = [
    validateAuthorization, //Autenticação da Rota
    validateMedicoBody,
    validateErrorBody,
    checkAtualizacaoEmail,
    encryptPassword
]

exports.handler = controller(async(req,res)=>{
    await findAndUpdateMedico( req._rt_auth_token.id , req.body)
    const atualizaInfoMedico = await findMedicoByEmail(req.body)
    res.status(status.OK).json(atualizaInfoMedico)
})