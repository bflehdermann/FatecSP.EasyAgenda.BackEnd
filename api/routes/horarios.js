const express = require('express')

const deleteHorario = require('../controllers/horarios/delete')
const getHorarioMedico = require('../controllers/horarios/getPorMedico')
const postHorario = require('../controllers/horarios/post')
const getHorarioPaciente=require('../controllers/horarios/getPorPaciente')
const postIndispMedicoDia = require('../controllers/horarios/postIndisponibilidadeMedico')
const putRelatorio = require('../controllers/horarios/putRelatorio')
const router = express.Router()

router.delete(
    '/horarios/:id',
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

router.post(
    '/horarios/paciente',
    getHorarioPaciente.middleware,
    getHorarioPaciente.handler
)

router.post(
  '/horario/indisponivel',
  postIndispMedicoDia.middleware,
  postIndispMedicoDia.handler
)

router.put(
  '/relatorio',
  putRelatorio.middleware,
  putRelatorio.handler
)

module.exports = router