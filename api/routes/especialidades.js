const express = require('express')

const getEspecialidades = require('../controllers/especialidade/get')
const postEspecialidades = require('../controllers/especialidade/post')

const router = express.Router()

router.get(
    '/especialidade',
    getEspecialidades.middleware,
    getEspecialidades.handler
)

router.post(
    '/especialidade',
    postEspecialidades.middleware,
    postEspecialidades.handler
)



module.exports = router