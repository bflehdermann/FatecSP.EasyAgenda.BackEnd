const {status} = require('../../presenters/http')
const { validateMedicoBody, checkEmail, checkPassword, encryptPassword } = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { createMedico, findMedicoByEmail } = require('../../database/repositories/medico')
const { createMedicoEspecialidade } = require('../../database/repositories/medico_especialidade')

exports.middleware = [
    validateMedicoBody,
    validateErrorBody,
    checkEmail,
    encryptPassword
]

exports.handler = controller(async({body},res)=>{
    const {id,nome,email} = await createMedico(body)
    createMedicoEspecialidade(id,body)
    res.status(status.OK).json({id,nome,email})
})