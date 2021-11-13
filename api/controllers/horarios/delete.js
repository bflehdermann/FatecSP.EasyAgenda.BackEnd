const { findAndDeleteHorario } = require("../../database/repositories/horarios");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");
const { validateIdHorario } = require("./rules");
const { validateErrorBody } = require("../../presenters/validator")


exports.middleware = [
    validateAuthorization,
    validateIdHorario,
    validateErrorBody
]

exports.handler = controller(async(req,res)=>{
    const resposta = await findAndDeleteHorario(req.body)
    if( resposta == undefined)
        res.status(status.BAD_REQUEST).json({erro:"Deu erro"})
    res.status(status.OK).json({deleted:'success'})
})