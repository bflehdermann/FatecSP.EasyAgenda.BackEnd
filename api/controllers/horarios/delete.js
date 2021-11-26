const { findAndDeleteHorario } = require("../../database/repositories/horarios");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");
const { validateIdHorario } = require("./rules");
const { validateErrorBody } = require("../../presenters/validator");
const { errorResponse } = require("../../presenters/handle");


exports.middleware = [
    validateAuthorization,
    validateIdHorario,
    validateErrorBody
]

exports.handler = controller(async(req,res)=>{
    const resposta = await findAndDeleteHorario(req.params)
    if( resposta == undefined)
        res.status(status.BAD_REQUEST).json(errorResponse(
          "Erro!",
          "Erro ao tentar Excluir horário"
        ))
    res.status(status.OK).json({deleted:'success'})
})