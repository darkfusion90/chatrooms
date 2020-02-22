const { createUnregisteredUser } = require('../controllers/users')

const isRegisterPath = (path) => {
    return /^\/api\/register(\/){0,1}$/.test(path)
}

const middleware = (req, res, next) => {
    if (isRegisterPath(req.path) || req.session.redirectedFromRegister) {
        next()
    } else if (!req.session.userId) {
        createUnregisteredUser(req.session.expires, (err, user) => {
            //In this case, unable to create user is the server's fault because the client doesn't send any payload
            //Hence, there is no way for the client to screw up
            //Failure will generally occur due to duplicate userId (automatically generated in the users controller)
            if (err || !user) {
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
            }

            req.session.userId = user.userId
            req.session.isRegistered = false
            req.session.save()
            res.json(user)
        })
    }
    else {
        next()
    }
}

module.exports = middleware