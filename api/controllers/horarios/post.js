const { createHorario } = require("../../database/repositories/horarios");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");
const { validateAgendamentoData, checkSePacienteExiste, checkSeMedicoExiste } = require("./rules");
const { validateErrorBody } = require("../../presenters/validator");
const { errorResponse } = require("../../presenters/handle");


exports.middleware = [
    validateAuthorization,
    validateAgendamentoData,
    validateErrorBody,
    checkSePacienteExiste,
    checkSeMedicoExiste
]

exports.handler = controller(async(req,res)=>{
    const resposta = await createHorario(req.body)
    if(resposta.id === undefined)
        return res.status(status.BAD_REQUEST).json(errorResponse(
        'Erro de horario', 'erro ao cadastrar o horario'
    ))
    res.status(status.OK).json(resposta)
})