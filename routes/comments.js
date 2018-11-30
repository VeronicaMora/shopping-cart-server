const express = require('express')
const router = express.Router()
const { create, get } = require('../controllers/comments')

router.get('/', get)
router.post('/', create)

module.exports = router