const { body } = require("express-validator");
const { findOneEspecialidade } = require("../../database/repositories/especialidades");
const { controller } = require("../../presenters/controller");
const { errorResponse } = require("../../presenters/handle");
const { status } = require("../../presenters/http");

exports.validateEspecialidadeBody = [
    body('nome').trim().isString().notEmpty().toUpperCase()
]


exports.verifyIfExistsNome = controller(async(req,res,next)=>{
    const especialidade = await findOneEspecialidade(req.body)
    if (especialidade)
        return res.status(status.BAD_REQUEST).json(errorResponse(
            'Especialidade existente!',
            'A especialidade informada já existe na base de dados'
        ))
    return next()
})