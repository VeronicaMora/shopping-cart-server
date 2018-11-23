const { addProduct, removeCartProduct, getProductsFromCart } = require('../helpers/queries')
module.exports = {
    get: (req, res) => {
        getProductsFromCart(req.userId).then((data) => {
            res.send(data)
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    add: (req, res) => {
        addProduct(req.userId, parseInt(req.body.id_product)).then((data) => {
            res.send({message: 'Se agrego el producto al carrito', id: data.id_user_products})
        }).catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
    },
    remove: (req, res) => {
        removeCartProduct(req.params.id).then(() => {
            res.send({message: 'Se ha eliminado un producto'})
        }).catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
    }   
}