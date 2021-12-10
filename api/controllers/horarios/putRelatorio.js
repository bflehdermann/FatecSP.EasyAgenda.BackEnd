const { setRelatorioByid } = require("../../database/repositories/horarios")
const { controller } = require("../../presenters/controller")
const { errorResponse } = require("../../presenters/handle")
const { status } = require("../../presenters/http")
const { validateAuthorization } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateIdRelatorio } = require("./rules")



exports.middleware = [
  validateAuthorization,
  validateIdRelatorio,
  validateErrorBody
]

exports.handler = controller(async(req,res)=>{
  const resposta = await setRelatorioByid(req.body)
  if(!resposta)
  return res.status(status.BAD_REQUEST).json(errorResponse(
    'Erro',
    'horario inexistente'
  ))
  res.status(status.OK).json(resposta)
})