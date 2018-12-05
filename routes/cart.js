const express = require('express')
const router = express.Router()
const cart = require('../controllers/cart')

router.get('/', cart.get)
router.post('/:id', cart.add)
router.delete('/:id', cart.remove)

module.exports = router