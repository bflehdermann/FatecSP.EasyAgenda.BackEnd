const {body} = require('express-validator')
const {status} = require('../../presenters/http')
const {findUserByEmail} = require('../../database/repositories/user')
const {errorResponse} = require('../../presenters/handle')
const { controller } = require('../../presenters/controller')
const { hash } = require('../../presenters/encryptation')


exports.validateUserBody = [
    body('nome').trim().isString().notEmpty(),
    body('email').isEmail(),
    body('senha').trim().isString().notEmpty(),
    body('confSenha').trim().isString().notEmpty()
]

exports.checkEmail = controller(async ({ body: { email } }, res, next) => {
        const user = await findUserByEmail(email)
        if (user)
            return res.status(status.BAD_REQUEST).json(errorResponse(
                'E-mail em uso!',
                'O endereço de e-mail informado já se encontra vincludado à outra conta.'
            ))
        return next()
})
    
exports.checkPassword = controller(async(req,res, next)=>{
        const {senha, confSenha} = req.body
        if(senha != confSenha)return res.status(status.BAD_REQUEST).json(errorResponse(
            'Senhas não correspondem!',
            'As senhas informadas não correspondem.'
        ))
        return next()
})

exports.encryptPassword = controller((req, _, next) => {
    req.body.senha = hash(req.body.senha)
    return next()
})