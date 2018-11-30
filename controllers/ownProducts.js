const { getMyProducts } = require('../helpers/queries')

module.exports = {
    get: (req, res) => {
        getMyProducts(req.userId).then((data) => {
            console.log(data)
            res.send(data)
        }).catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
    }
}