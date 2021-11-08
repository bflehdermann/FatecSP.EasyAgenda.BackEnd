const express = require('express')
const Medico = require('../controllers/medico/medico')
const router = express.Router()

router.post(
    '/medico',
    Medico.middleware,
    Medico.post
)

module.exports = router