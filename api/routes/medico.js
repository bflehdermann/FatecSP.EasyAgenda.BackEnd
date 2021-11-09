const express = require('express')
const Medico = require('../controllers/medico/post')
const atualizaMedico = require('../controllers/medico/put')
const router = express.Router()

router.post(
    '/medico',
    Medico.middleware,
    Medico.handler
)

router.put(
    '/medico',
    atualizaMedico.middleware,
    atualizaMedico.handler
)



module.exports = router