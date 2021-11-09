const {status} = require('../../presenters/http')
const { validateMedicoBody, checkEmail, checkPassword, encryptPassword } = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { createMedico, findMedicoByEmail } = require('../../database/repositories/medico')

exports.middleware = [
    validateMedicoBody,
    validateErrorBody,
    checkEmail,
    encryptPassword
]

exports.handler = controller(async({body},res)=>{
    await createMedico(body)
    const {id,nome,email} = await findMedicoByEmail(body)
    res.status(status.OK).json({id,nome,email})
})