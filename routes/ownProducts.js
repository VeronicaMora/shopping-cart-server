const express = require('express')
const router = express.Router()
const { get } = require('../controllers/ownProducts')

router.get('/', get)

module.exports = router