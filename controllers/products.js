const { getAllProducts, deleteProduct, deleteUserProduct, searchProduct, createProduct, addProductProfile, updateProduct } = require('../helpers/queries')

module.exports = {
    get: (req, res) => {
        try {
            getAllProducts().then((data) => {
                console.log(data)
                res.send(data)
            }).catch((error) => {
                console.log(error)
                res.status(400).send(error)
            })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    search: (req, res) => {
        searchProduct(req.params.text).then((data) => {
            res.send(data)
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    create: (req, res) => {
        createProduct(req.body.name, req.body.des_product, req.body.price, req.body.available, req.body.image).then((data) => {
            console.log(data)
            addProductProfile(req.userId, data.id_product).then((data) => {
                res.send(data)
            }).catch((error) => {
                res.status(400).send(error)
            })
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    remove: (req, res) => {
        deleteUserProduct(req.params.id).then((data) => {
            deleteProduct(req.params.id).then((data) => {
                res.send(data)
            }).catch((error) => {
                res.status(400).send(error)
            })
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    update: (req, res) => {
        updateProduct(req.params.id, req.body.name, req.body.des_product, req.body.price, req.body.available, req.body.image).then((data) => {
            res.send(data)
        }).catch((error) => {
            res.status(400).send(error)
        })
    }
}