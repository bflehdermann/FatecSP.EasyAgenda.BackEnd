const express = require('express')
const AuthMedico = require('../controllers/login/medico')
const AuthPaciente = require('../controllers/login/paciente')
const router = express.Router()

router.post(
    '/paciente/login',
    AuthPaciente.middleware,
    AuthPaciente.post
)

router.post(
    '/medico/login',
    AuthMedico.middleware,
    AuthMedico.post
)

module.exports = router