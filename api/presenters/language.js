exports.setLanguage = req => {
    req._rt_lang = req.header('Content-Language') || process.env.DEFAULT_LANGUAGE
}

exports.getLanguage = req => { return req._rt_lang }