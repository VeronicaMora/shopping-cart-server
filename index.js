const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./helpers/config')
const { isAuth, isLogged } = require('./middlewares/isAuth')
const auth = require('./routes/auth')
const products = require('./routes/products')
const cart = require('./routes/cart')
const profile = require('./routes/profile')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/auth', auth)
app.use('/products', isAuth, products)
app.use('/cart', isAuth, cart)
app.use('/profile', isAuth, profile)

app.listen(config.port, function() {
    console.log(`Escuchando el puerto ${config.port}`)
})