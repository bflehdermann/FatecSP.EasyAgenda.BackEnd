const express = require('express')
const Paciente = require('../controllers/paciente/post')
const router = express.Router()

router.post(
    '/paciente',
    Paciente.middleware,
    Paciente.handler
)

module.exports = router