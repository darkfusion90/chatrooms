const passport = require('../config/passportConfig')
const { getUser } = require('../controllers/users')
const { genericHandlerCallback } = require('./routeUtils')
const httpStatusCodes = require('../constants/httpStatusCodes')
const updateSessionExpiryRegisteredUser = require('../utils/updateSessionExpiryRegisteredUser')

const logger = require('../utils/logger')('[Router: Login] ')

const login = (user, req, res) => {
    req.logIn(user, function (err) {
        if (err) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
        }
        else {
            logger.debug('UserId before update: ', req.session.userId)
            req.session.userId = user._id
            req.session.cookie.expires = updateSessionExpiryRegisteredUser(req.session.cookie.expires)
            req.session.save()
            res.json(user)
            logger.debug('UserId updated to: ', req.session.userId)
        }
    });
}

const matchesLoginPath = (what) => {
    return /^\/api\/login[\/]{0,1}$/.test(what)
}

module.exports = (req, res, next) => {
    if (matchesLoginPath(req.path) && req.method === 'POST') {
        //Simply return user if already logged in
        if (req.isAuthenticated()) {
            getUser(req.session.userId, genericHandlerCallback)
        }

        logger.debug('Will authenticate')
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
            }
            else if (!user) {
                res.status(httpStatusCodes.UNAUTHORIZED).json(info)
            }
            else {
                login(user, req, res)
            }
        })(req, res, next)
    }
    else {
        logger.debug('Not authenticating')
        next()
    }
}