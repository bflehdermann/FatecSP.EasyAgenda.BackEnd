const {status} = require('../../presenters/http')
const { validateMedicoBody, encryptPassword,checkAtualizacaoEmail} = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { validateAuthorization } = require('../../presenters/jwt')
const { findAndUpdateMedico, findMedicoByEmail } = require('../../database/repositories/medico')
const { updateMedicoEspecialidade, findMedicoEspecialidadesById } = require('../../database/repositories/medico_especialidade')

exports.middleware = [
    validateAuthorization, //função para Autenticação da Rota
    validateMedicoBody,
    validateErrorBody,
    checkAtualizacaoEmail,
    encryptPassword
]

exports.handler = controller(async(req,res)=>{
    await findAndUpdateMedico( req._rt_auth_token.id , req.body)
    const {senha, id, ...atualizaInfoMedico} = await findMedicoByEmail(req.body)
    await updateMedicoEspecialidade(req._rt_auth_token.id , req.body)
    const atualizaEspecialidadeMedico = await findMedicoEspecialidadesById(req._rt_auth_token.id)
    atualizaInfoMedico.especialidades = atualizaEspecialidadeMedico
    res.status(status.OK).json(atualizaInfoMedico)
})