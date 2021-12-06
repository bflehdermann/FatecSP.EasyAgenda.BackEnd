const { FindAndUpdatePaciente } = require("../../database/repositories/paciente");
const { controller } = require("../../presenters/controller");
const { status } = require("../../presenters/http");
const { validateAuthorization, generateToken } = require("../../presenters/jwt");
const { validateErrorBody } = require("../../presenters/validator");
const { validaConvenio, checkAtualizacaoEmail, encryptPassword, validaPacientePutBody } = require("./rules");


exports.middleware = [
    validateAuthorization, //funcao para autenticacao da rota
    validaPacientePutBody,
    validateErrorBody,
    validaConvenio,
    checkAtualizacaoEmail,
    encryptPassword
]

exports.handler = controller(async(req,res)=>{
    const {senha,id, ...atualizaInfoPaciente} = await FindAndUpdatePaciente(req._rt_auth_token.id , req.body)

    res.status(status.OK).json({token:  generateToken({ acesso: 'paciente', id:user.id, email: user.email  }), user:atualizaInfoPaciente})
})