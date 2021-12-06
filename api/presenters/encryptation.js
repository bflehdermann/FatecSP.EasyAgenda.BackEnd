const bcrypt = require('bcrypt'); 

exports.hash = content => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(content, salt)
}

exports.compare = (content, hash) => {
    return bcrypt.compareSync(content, hash)
}
