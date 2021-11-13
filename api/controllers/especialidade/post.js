const { createEspecialidade } = require("../../database/repositories/especialidades")
const { controller } = require("../../presenters/controller")
const { status } = require("../../presenters/http")
const { validateAuthorization } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateEspecialidadeBody, verifyIfExistsNome } = require("./rules")

exports.middleware = [
    validateAuthorization,
    validateEspecialidadeBody,
    validateErrorBody,
    verifyIfExistsNome
]

exports.handler = controller(async(req,res)=>{
    const resposta = await createEspecialidade(req.body)
    return res.status(status.OK).json(resposta)
})