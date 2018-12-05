const express = require('express')
const router = express.Router()
const { create, get, remove } = require('../controllers/comments')

router.get('/', get)
router.post('/', create)
router.delete('/id', remove)

module.exports = router