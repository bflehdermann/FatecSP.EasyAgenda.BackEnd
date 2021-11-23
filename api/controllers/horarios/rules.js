const {body} = require('express-validator')


exports.validateIdHorario = [
    body('id').trim().isString().notEmpty()
]

exports.validateIdMedicoData = [
    body('idMedico').trim().isString().notEmpty(),
    body('dia').trim().isDate().notEmpty()
]