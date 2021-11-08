const jwt = require('jsonwebtoken')
const { status } = require('./http')
const { controller } = require('./controller')
const { findMedicoByEmail } = require('../database/repositories/medico')

const { TOKEN_SECRET} = process.env

const verifyToken = token => {return jwt.verify(token, TOKEN_SECRET)} 

exports.validateToken = async (token) => {
    try{
        if (!/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\\+\\/=]*)$/i.test(
            token
          )
        ) return false
        return await verifyToken(token)
    } catch{
        return false
    }
}

exports.validateAuthorization = controller(async (req, res, next) => {
    console.log(req)
    const authHeader = req.header('Authorization')
    if (!authHeader) return res._rt_send_error(status.UNAUTHORIZED, 'AUTH_REQUIRED')
    const splitedAuthHeader = authHeader.split(' ')
    if (splitedAuthHeader.length !== 2 || !/^Bearer$/i.test(splitedAuthHeader[0]))
        return res._rt_send_error(status.UNAUTHORIZED, 'AUTH_UNRECOGNIZABLE')
    const validatedToken = await this.validateToken(splitedAuthHeader[1])
    if (!validatedToken)return res._rt_send_error(status.UNAUTHORIZED, 'INVALID_TOKEN')
    const{id} = validatedToken
    const user = await findMedicoByEmail({id})
    if (user == null)return res._rt_send_error(status.UNAUTHORIZED, 'INVALID_TOKEN')
    req._rt_auth_token = validatedToken
    return next()  
})

exports.generateToken = object => {
    return jwt.sign(object, TOKEN_SECRET)
}
