const express = require('express')

const getEspecialidades = require('../controllers/especialidade/get')

const router = express.Router()

router.get(
    '/especialidade',
    
    getEspecialidades.handler
)

module.exports = router