const express = require('express')

const deleteHorario = require('../controllers/horarios/delete')
const getHorarioMedico = require('../controllers/horarios/getPorMedico')
const postHorario = require('../controllers/horarios/post')
const getHorarioPaciente=require('../controllers/horarios/getPorPaciente')
const router = express.Router()

router.delete(
    '/horarios',
    deleteHorario.middleware,
    deleteHorario.handler
)

router.post(
    '/horarios/disponiveis',
    getHorarioMedico.middleware,
    getHorarioMedico.handler
)

router.post(
    '/horarios/agendar',
    postHorario.middleware,
    postHorario.handler
)

router.get(
    '/horarios/paciente/:id',
    getHorarioPaciente.middleware,
    getHorarioPaciente.handler
)

module.exports = router