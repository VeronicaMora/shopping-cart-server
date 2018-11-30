const { createComment, getComments } = require('../helpers/queries')

module.exports = {
    create: (req, res) => {
        createComment(req.body.comment_text, req.body.created_at, req.params.id_product, req.userId).then((data) => {
            res.send(data)
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
    }
}