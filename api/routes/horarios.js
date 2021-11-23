const express = require('express')

const deleteHorario = require('../controllers/horarios/delete')
const getHorarioMedico = require('../controllers/horarios/getPorMedico')

const router = express.Router()

router.delete(
    '/horarios',
    deleteHorario.middleware,
    deleteHorario.handler
)

router.get(
    '/horarios/disponiveis',
    getHorarioMedico.middleware,
    getHorarioMedico.handler
)


module.exports = router