const { createUnregisteredUser } = require('../controllers/users')
module.exports = (req) => {
    return new Promise((resolve, reject) => {
        createUnregisteredUser(req.session.cookie.expires, (err, user) => {
            if (err) {
                reject(err)
            } else if (!user) {
                console.log('here')
                reject(new Error('User could not be created'))
            } else {
                req.session.userId = user._id
                req.session.isRegistered = false
                req.session.save()
                resolve(user)
            }
        })
    })
}