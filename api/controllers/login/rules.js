const { body } = require("express-validator");

exports.validateAuthBody = [
    body('email').isEmail(),
    body('senha').trim().isString().notEmpty()
]