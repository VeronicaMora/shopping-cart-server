const express = require('express')
const router = express.Router()
const {get, create, search, remove, update } = require('../controllers/products')

router.get('/', get)
router.post('/', create)
router.get('/:text', search)
router.delete('/:id', remove)
router.patch('/:id', update)

module.exports = router