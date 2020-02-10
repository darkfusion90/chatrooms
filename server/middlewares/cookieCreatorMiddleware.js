const usersController = require('../controllers/users')

const debug = (...args) => {
    console.debug('[CookieCreatorMiddleware] ', args)
}

const middleware = (req, res, next) => {
    if (!req.session.userId) {
        debug('New User')
        usersController.createUnregisteredUser(req.session.cookie.expires, (err, user) => {
            if (err || !user) {
                debug('Error creating user: ', err)
                const error = new Error('Internal Server Error')
                next(error)
            }

            req.session.userId = user.userId
            req.session.save()
            debug('Created user: ', user.userId)
        })
    }
    else {
        debug('UserId: ', req.session.userId)
    }
    next()
}

module.exports = middleware