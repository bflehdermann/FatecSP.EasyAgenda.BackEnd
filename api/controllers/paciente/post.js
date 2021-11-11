const {status} = require('../../presenters/http')
const { validaPacienteBody, checkEmail, encryptPassword, validaConvenio } = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { createPaciente } = require('../../database/repositories/paciente')

exports.middleware = [
    validaPacienteBody,
    validaConvenio,
    validateErrorBody,
    checkEmail,
    encryptPassword
]

exports.handler = controller(async({body},res)=>{
    const {id,nome,email} = await createPaciente(body)
    res.status(status.OK).json({id,nome,email})
})