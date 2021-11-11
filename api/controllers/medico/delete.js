const { findAndDeleteMedico } = require("../../database/repositories/medico");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");


exports.middleware = [
    validateAuthorization
]

exports.handler = controller(async(req,res)=>{
    await findAndDeleteMedico(req._rt_auth_token.id)
    res.status(status.OK).json({deleted:'success'})
})