const express = require('express')

const deleteHorario = require('../controllers/horarios/delete')

const router = express.Router()

router.delete(
    '/horarios',
    deleteHorario.middleware,
    deleteHorario.handler
)



module.exports = router