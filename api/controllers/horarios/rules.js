const {body} = require('express-validator')
const { findMedicoById } = require('../../database/repositories/medico')
const { findPacienteById } = require('../../database/repositories/paciente')
const { controller } = require('../../presenters/controller')
const { errorResponse } = require('../../presenters/handle')
const { status } = require('../../presenters/http')


exports.validateIdHorario = [
    body('id').trim().isString().notEmpty()
]

exports.validateIdMedicoData = [
    body('idMedico').trim().isNumeric().notEmpty(),
    body('dia').trim().isDate().notEmpty()
]

exports.validateAgendamentoData =[
    body('id_medico').trim().isString().notEmpty(),
    body('hora_inicio').trim().notEmpty(),
    body('hora_fim').trim().notEmpty(),
    body('data').trim().notEmpty(),
    body('id_cliente').trim().isString().notEmpty()
]

exports.checkSePacienteExiste = controller(async(req,res,next)=>{
    const resposta = await findPacienteById(req.body)
    if(!resposta)
        return res.status(status.BAD_REQUEST).json(errorResponse(
            "Erro", "paciente nao existe"
        ))
    return next()
})

exports.checkSeMedicoExiste = controller(async(req,res,next)=>{
    const resposta = await findMedicoById(req.body)
    if(!resposta)
        return res.status(status.BAD_REQUEST).json(errorResponse(
            "Erro", "medico nao existe"
        ))
    return next()
})