const errors = require('../presenters/error')
const { getLanguage } = require('../presenters/language')

const _rt_send_error = (req, res) => (status, error) => {
    if (!status || !error) throw new Error('Necessário informar status e erro a ser enviado!')
    const lang = getLanguage(req)
    return res.status(status).json({ errors: [ errors(lang)[error] ] })
}

module.exports = () => (req, res, next) => {
    res._rt_send_error = _rt_send_error(req, res)
    return next()
}