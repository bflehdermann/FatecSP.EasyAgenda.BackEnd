const express = require('express')
const Medico = require('../controllers/medico/post')
const atualizaMedico = require('../controllers/medico/put')
const deletaMedico = require('../controllers/medico/delete')
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

router.delete(
    '/medico',
    deletaMedico.middleware,
    deletaMedico.handler
)


module.exports = router