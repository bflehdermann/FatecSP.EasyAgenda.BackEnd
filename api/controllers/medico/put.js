const {status} = require('../../presenters/http')
const { validateMedicoBody, encryptPassword,checkAtualizacaoEmail} = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { validateAuthorization } = require('../../presenters/jwt')
const { findAndUpdateMedico, findMedicoByEmail } = require('../../database/repositories/medico')
const { updateMedicoEspecialidade, findMedicoEspecialidadesById } = require('../../database/repositories/medico_especialidade')

exports.middleware = [
    validateAuthorization, //função para Autenticação de Rota
    validateMedicoBody,
    validateErrorBody,
    checkAtualizacaoEmail,
    encryptPassword
]

exports.handler = controller(async(req,res)=>{
    const {senha, id, ...atualizaInfoMedico} =await findAndUpdateMedico( req._rt_auth_token.id , req.body)

    const atualizaEspecialidadeMedico = await updateMedicoEspecialidade(req._rt_auth_token.id , req.body)

    atualizaInfoMedico.especialidades = atualizaEspecialidadeMedico
    res.status(status.OK).json(atualizaInfoMedico)
})