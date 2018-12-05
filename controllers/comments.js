const { createComment, getComments, removeComment, productComments } = require('../helpers/queries')

module.exports = {
    create: (req, res) => {
        createComment(req.body.comment_text, req.body.created_at, req.params.id_product, req.userId).then((data) => {
            console.log(data)
            productComments(data.id_comment, data.id_product, data.id_user)
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    get: (req, res) => {
        getComments().then((data) => {
            res.send(data)
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    remove: (req, res) => {
        removeComment(req.params.id).then((data) => {
            console.log(data)
            res.send(data)
        }).catch((error) => {
            console.log(data)
            res.status(400).send(error)
        })
    }
}