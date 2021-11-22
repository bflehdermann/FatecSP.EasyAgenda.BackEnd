const {body, param} = require('express-validator')
const {status} = require('../../presenters/http')
const {findMedicoByEmail} = require('../../database/repositories/medico')
const {errorResponse} = require('../../presenters/handle')
const { controller } = require('../../presenters/controller')
const { hash } = require('../../presenters/encryptation')
const { findEspecialidades, findAllEspecialidades } = require('../../database/repositories/especialidades')


exports.validateMedicoBody = [
    body('nome').trim().isString().notEmpty(),
    body('email').isEmail(),
    body('senha').trim().isString().notEmpty(),
    body('crm').trim().isString().notEmpty(),
    body('endereco').trim().isString().notEmpty(),
    body('cidade').trim().isString().notEmpty(),
    body('estado').trim().isString().notEmpty(),
    body('cep').trim().isString().notEmpty(),
    body('especialidades').isArray().notEmpty()
]

exports.validateMedicoPutBody = [
    body('nome').trim().isString().notEmpty(),
    body('email').isEmail(),
    body('crm').trim().isString().notEmpty(),
    body('endereco').trim().isString().notEmpty(),
    body('cidade').trim().isString().notEmpty(),
    body('estado').trim().isString().notEmpty(),
    body('cep').trim().isString().notEmpty(),
    body('especialidades').isArray().notEmpty()
]

exports.checkEmail = controller(async ({ body}, res, next) => {
        const user = await findMedicoByEmail(body)
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
    if(req.body.senha)
        req.body.senha = hash(req.body.senha)
    return next()
})

exports.checkAtualizacaoEmail = controller(async(req,res,next)=>{
    if(req.body.email != req._rt_auth_token.email){
        const user = await findMedicoByEmail(req.body)
        if (user)
            return res.status(status.BAD_REQUEST).json(errorResponse(
                'E-mail em uso!',
                'O endereço de e-mail informado já se encontra vincludado à outra conta.'
            ))
    }
        
    return next()
})

exports.validateParams = [
    param('id').trim().notEmpty().isString().toInt()
]

exports.checkIdEspecialidade = controller(async(req,res,next)=>{
    const id = req.params.id
    let checkId = false
    const especialidades = await findAllEspecialidades()
    especialidades.map( especialidade =>{
        if(especialidade.id == id)
            checkId = true
    })
    if(!checkId)
    return res.status(status.BAD_REQUEST).json(errorResponse(
        'valor Inválido',
        'O valor informado não foi encontrado'
    ))
    return next()
})