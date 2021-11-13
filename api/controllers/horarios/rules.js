const {body} = require('express-validator')


exports.validateIdHorario = [
    body('id').trim().isString().notEmpty()
]