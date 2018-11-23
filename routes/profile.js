const express = require('express')
const router = express.Router()
const { get } = require('../controllers/profile')


router.get('/', get)

module.exports = router