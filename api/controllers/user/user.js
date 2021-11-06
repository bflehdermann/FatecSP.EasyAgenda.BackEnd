const {status} = require('../../presenters/http')
const { validateUserBody, checkEmail, checkPassword, encryptPassword } = require('./rules')
const { validateErrorBody } = require('../../presenters/validator')
const { controller } = require('../../presenters/controller')
const { createUser, findUserByEmail } = require('../../database/repositories/user')

exports.middleware = [
    validateUserBody,
    validateErrorBody,
    checkEmail,
    checkPassword,
    encryptPassword
]

exports.post = controller(async({body:{nome,email,senha}},res)=>{
    await createUser(nome,email,senha)
    const {id} = await findUserByEmail(email)
    res.status(status.OK).json({id,nome,email})
})