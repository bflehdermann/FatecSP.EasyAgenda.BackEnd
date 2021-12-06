const { controller } = require("../../presenters/controller")
const { status } = require("../../presenters/http")
const { validateAuthorization } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateParams, checkIdEspecialidade } = require("./rules")
const {findAllMedicoByEspecialidade} = require('../../database/repositories/medico_especialidade')


exports.middleware = [
    validateAuthorization,
    validateParams,
    validateErrorBody,
    checkIdEspecialidade
    
]

exports.handler = controller(async(req,res)=>{
    const EspecialidadesMedico = await findAllMedicoByEspecialidade(req)
    res.status(status.OK).json(EspecialidadesMedico)
})