const errorObject = (title, message) => {
    return { title, message }
}

const getErrors = str => {
    return {
        NOT_FOUND: errorObject(str['NOT_FND_TIT'], str['NOT_FND_MSG']),
        INTERNAL_SERVER_ERROR: errorObject(str['SVR_ERRO_TIT'], str['SVR_ERRO_MSG']),
        AUTH_REQUIRED: errorObject(str['AUTH_REQ_TIT'], str['AUTH_REQ_MSG']),
        AUTH_UNRECOGNIZABLE: errorObject(str['AUTH_UNREC_TIT'], str['AUTH_UNREC_MSG']),
        INVALID_TOKEN: errorObject(str['INV_TOK_TIT'], str['INV_TOK_MSG'])
    }
}

const getStr = (lang) => { return require('./strings')[lang] }

module.exports = lang => {
    const str = getStr(lang)
    return getErrors(str)
}