const { updateProfile, getProfile } = require('../helpers/queries')

module.exports = {
    update: (req, res) => {
        updateProfile(req.params.id, req.body.image, req.body.info, req.userId).then((data) => {
            console.log(data)
            res.send(data)
        }).catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
    },
    get: (req, res) => {
        getProfile().then((data => {
            console.log(data)
        })).catch((error) => {
            console.log(error)
        })
    }
}