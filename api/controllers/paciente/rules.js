const {body} = require('express-validator')
const {status} = require('../../presenters/http')
const {findPacienteByEmail} = require('../../database/repositories/paciente')
const {errorResponse} = require('../../presenters/handle')
const { controller } = require('../../presenters/controller')
const { hash } = require('../../presenters/encryptation')


exports.validaPacienteBody = [
    body('nome').trim().isString().notEmpty(),
    body('email').isEmail(),
    body('cpf').trim().isString().notEmpty(),
    body('convenio').trim().isBoolean().notEmpty(),
    body('senha').trim().isString().notEmpty()
]

exports.validaConvenio = controller(async ({ body: { convenio } }, res, next)=>{
    if(convenio){
        body('carteirinhaConvenio').trim().isString().notEmpty(),
        body('validadeConvenio').trim().isDate().notEmpty(),
        body('planoConvenio').trim().isString().notEmpty()
    }
    return next()
})

exports.checkEmail = controller(async ({body}, res, next) => {
        const user = await findPacienteByEmail(body)
        if (user)
            return res.status(status.BAD_REQUEST).json(errorResponse(
                'E-mail em uso!',
                'O endereço de e-mail informado já se encontra vincludado à outra conta.'
            ))
        return next()
})
    /*
exports.checkPassword = controller(async(req,res, next)=>{
        const {senha, confSenha} = req.body
        if(senha != confSenha)return res.status(status.BAD_REQUEST).json(errorResponse(
            'Senhas não correspondem!',
            'As senhas informadas não correspondem.'
        ))
        return next()
})*/

exports.encryptPassword = controller((req, _, next) => {
    req.body.senha = hash(req.body.senha)
    return next()
})