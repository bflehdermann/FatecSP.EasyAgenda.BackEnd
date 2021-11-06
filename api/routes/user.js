const express = require('express')
const User = require('../controllers/user/user')
const router = express.Router()

router.post(
    '/login',
    User.middleware,
    User.post
)

module.exports = router