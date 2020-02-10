const usersController = require('../controllers/users')
const logger = require('../utils/logger')('[CookieCreatorMiddleware] ')

const middleware = (req, res, next) => {
    if (!req.session.userId) {
        logger.debug('New User')
        usersController.createUnregisteredUser(req.session.cookie.expires, (err, user) => {
            if (err || !user) {
                logger.debug('Error creating user: ', err)
                const error = new Error('Internal Server Error')
                next(error)
            }

            req.session.userId = user.userId
            req.session.save()
            logger.debug('Created user: ', user.userId)
        })
    }
    else {
        logger.debug('UserId: ', req.session.userId)
    }
    next()
}

module.exports = middleware