const { encode, decode } = require("../helpers/jwt")
const { userValidation, userRegister, login, deleteAccount } = require('../helpers/queries')
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: (req, res) => {
        userValidation(req.body.username).then(() => {
            res.status(400).send("Username Duplicate")
        }).catch(err => {
            if(err.message === 'No data returned from the query.')
                userRegister(req.body.username, req.body.password).then(data => {
                    encode({ id_user: data.id_user, username: req.body.username }).then(token => {
                        res.send({ token  })
                    }).catch(error => res.status(400).send({ error }))
                }).catch(error => {
                    res.status(400).send({ error })
                })
            else
                return res.status(400).send({ error: err.message })
        })
    },
    login: (req, res) => {
        login(req.body.username).then(data =>{
            const { id_user, username, password } = data
            if(bcrypt.compareSync(req.body.password, password))
                encode({ id_user, username }).then(token => {
                    res.send({ id_user, username, token })
                }).catch(error => res.status(400).send(error))
            else
                return res.status(400).send('Error logeando')
        })
        .catch(err => {
            return res.status(400).send(err.message)
        })
    },
    removeAccount: (req, res) => {
        decode(req.headers.authorization)
            .then(user => deleteAccount(user.id_user))
            .then(data => {
                console.log(data)
                res.send(data)
            })
            .catch((error) => {
                return res.send({
                    status: 400,
                    response: error
                });   
            })
    }

}