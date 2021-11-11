const { findAndDeletePaciente } = require("../../database/repositories/paciente");
const { controller } = require("../../presenters/controller");
const { errorResponse } = require("../../presenters/handle");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");


exports.middleware = [
    validateAuthorization
]

exports.handler = controller(async(req,res)=>{
    await findAndDeletePaciente(req._rt_auth_token.id)

    res.status(status.OK).json({deleted:'success'})
})