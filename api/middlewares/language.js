const { setLanguage } = require('../presenters/language')

module.exports = () => (req, _, next) => {
    setLanguage(req)
    return next()
}
