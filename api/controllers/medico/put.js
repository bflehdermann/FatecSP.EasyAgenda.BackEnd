const {status} = require('../../presenters/http')
const { encryptPassword,checkAtualizacaoEmail, validateMedicoPutBody} = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { validateAuthorization, generateToken } = require('../../presenters/jwt')
const { findAndUpdateMedico, findMedicoByEmail } = require('../../database/repositories/medico')
const { updateMedicoEspecialidade, findMedicoEspecialidadesById } = require('../../database/repositories/medico_especialidade')

exports.middleware = [
    validateAuthorization, //função para Autenticação de Rota
    validateMedicoPutBody,
    validateErrorBody,
    checkAtualizacaoEmail,
    encryptPassword
]

exports.handler = controller(async(req,res)=>{
    const {senha, id, ...atualizaInfoMedico} =await findAndUpdateMedico( req._rt_auth_token.id , req.body)

    const atualizaEspecialidadeMedico = await updateMedicoEspecialidade(req._rt_auth_token.id , req.body)

    atualizaInfoMedico.especialidades = atualizaEspecialidadeMedico
    res.status(status.OK).json({token: generateToken({ acesso: 'medico', id:user.id, email: user.email  }),user:atualizaInfoMedico})
})