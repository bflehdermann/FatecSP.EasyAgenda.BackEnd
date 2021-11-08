const express = require('express')
const Auth = require('../controllers/authentication/auth')
const router = express.Router()

router.post(
    '/auth',
    Auth.middleware,
    Auth.post
)

module.exports = router