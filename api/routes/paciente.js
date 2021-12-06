const express = require('express')
const Paciente = require('../controllers/paciente/post')
const atualizaPaciente = require('../controllers/paciente/put')
const deletaPaciente = require('../controllers/paciente/delete')
const router = express.Router()

router.post(
    '/paciente',
    Paciente.middleware,
    Paciente.handler
)

router.put(
    '/paciente',
    atualizaPaciente.middleware,
    atualizaPaciente.handler
)

router.delete(
    '/paciente',
    deletaPaciente.middleware,
    deletaPaciente.handler
)

router

module.exports = router