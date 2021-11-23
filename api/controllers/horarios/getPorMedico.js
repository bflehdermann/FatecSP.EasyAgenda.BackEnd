const { findHorarioMedicoPorDia } = require("../../database/repositories/horarios");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");
const { validateIdMedicoData } = require("./rules");
const { validateErrorBody } = require("../../presenters/validator")


exports.middleware = [
    validateAuthorization,
    validateIdMedicoData,
    validateErrorBody
]

exports.handler = controller(async(req,res)=>{
    const resposta = await findHorarioMedicoPorDia(req.body)
    
    res.status(status.OK).json(resposta)
})