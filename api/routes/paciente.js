const express = require('express')
const Paciente = require('../controllers/paciente/paciente')
const router = express.Router()

router.post(
    '/paciente',
    Paciente.middleware,
    Paciente.post
)

module.exports = router