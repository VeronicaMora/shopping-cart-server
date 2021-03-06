const express = require('express')
const router = express.Router()
const { get, update } = require('../controllers/profile')


router.get('/', get)
router.patch('/:id', update)

module.exports = router