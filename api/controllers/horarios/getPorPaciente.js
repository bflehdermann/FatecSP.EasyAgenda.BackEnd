
const moment = require('moment')
const { FindHorarioPorIdPaciente } = require("../../database/repositories/horarios")
const { controller } = require("../../presenters/controller")
const { status } = require("../../presenters/http")
const { validateAuthorization } = require("../../presenters/jwt")
const { validateErrorBody } = require("../../presenters/validator")
const { validateParams, checkIdPaciente } = require("./rules")



exports.middleware = [
    validateAuthorization,
    validateParams,
    validateErrorBody,
    checkIdPaciente
]

exports.handler = controller(async(req,res)=>{
    const resposta = await FindHorarioPorIdPaciente(req.body)
    const respostaformatada = []
    resposta.map(date => {
      let eventos = {}
      let data = moment(date.data).format('DD-MM-YYYY')
      let dataSplit = data.split('-')
      let hora_ini = date.hora_inicio.split(':')
      let hora_fim = date.hora_fim.split(':')
      eventos.title = date.especialidade
      eventos.start = new Date(dataSplit[2],dataSplit[1]-1,dataSplit[0],hora_ini[0],hora_ini[1],0)
      eventos.end = new Date(dataSplit[2],dataSplit[1]-1,dataSplit[0],hora_fim[0], hora_fim[1],0)
      eventos.desc = 'Medico' + date.nome_medico + '\n email' + date.email + '\n Endereço: ' + date.endereco + ',' + date.cep + ',' + date.cidade + ',' + date.estado
      respostaformatada.push(eventos)
    })
    res.status(status.OK).json({resposta,'calendar':respostaformatada})

})