const jwt = require('jsonwebtoken') 

module.exports.encode = data => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, "moga", (error, token) => {
            if(error)
                 reject(error)
            resolve(token)
        })
    })
}
module.exports.decode = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "moga", (error, decoded) => {
            if(error)
                 reject(error)
            resolve(decoded)
        })
    })
}