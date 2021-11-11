const { FindAndUpdatePaciente } = require("../../database/repositories/paciente");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization } = require("../../presenters/jwt");
const { validaPacienteBody, validaConvenio, checkAtualizacaoEmail, encryptPassword } = require("./rules");


exports.middleware = [
    validateAuthorization, //funcao para autenticacao da rota
    validaPacienteBody,
    validaConvenio,
    checkAtualizacaoEmail,
    encryptPassword
]

exports.handler = controller(async(req,res)=>{
    const {senha,id, ...atualizaInfoPaciente} = await FindAndUpdatePaciente(req._rt_auth_token.id , req.body)

    res.status(status.OK).json(atualizaInfoPaciente)
})