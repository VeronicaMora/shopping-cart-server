const { decode } = require("../helpers/jwt")

module.exports.isAuth = (req, res ,next) => {
    if(!req.headers.authorization)
        return res.send({
            status: 400,
            response: 'Debes iniciar sesion'
        });
    decode(req.headers.authorization)
        .then(user => {
            req.userId = user.id_user
            next()
        })
        .catch(() => {
            return res.send({
                status: 400,
                response: 'Debes iniciar sesion'
            });   
        })
}
module.exports.isLogged = (req, res, next) => {
    if(!req.headers.authorization)
        next()
    else
        res.send({
            status: 304,
            response: 'Ya existe una sesion'
        })
}