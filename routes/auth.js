const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const { isLogged } = require('../middlewares/isAuth')

router.delete('/', auth.removeAccount)
router.post('/signup', isLogged, auth.signUp)
router.post('/login', isLogged, auth.login)

module.exports = router