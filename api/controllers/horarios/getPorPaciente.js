const { FindHorarioPorIdPaciente } = require("../../database/repositories/horarios")
const { controller } = require("../../presenters/controller")
const { status } = require("../../presenters/http")
const { validateAuthorization } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateParams, checkIdPaciente } = require("./rules")



exports.middleware = [
    validateAuthorization,
    validateParams,
    validateErrorBody,
    checkIdPaciente
]

exports.handler = controller(async(req,res)=>{
    const resposta = await FindHorarioPorIdPaciente(req)
    res.status(status.OK).json(resposta)
})