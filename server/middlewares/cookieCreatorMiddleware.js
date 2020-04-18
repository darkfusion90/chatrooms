const httpStatusCodes = require('../constants/httpStatusCodes')
const addUserToSession = require('../utils/addUserToSession')
const logger = require('../utils/logger')('[CookieCreatorMiddleware]')

const isRegisterPath = (path) => {
    return /^\/api\/register(\/){0,1}$/.test(path)
}

const middleware = (req, res, next) => {
    if (isRegisterPath(req.path) || req.session.redirectedFromRegister) {
        //logger.debug('Either register path or redirected from register')
        next()
    } else if (!req.session.userId) {
        //logger.debug('Session doesn\'t contain user. Creating one. Session: ', req.session)
        addUserToSession(req).then((user) => {
            //logger.debug('User successfully added to session. Session: ', req.session, '\nUser: ', user)
            next()
        }).catch(err => {
            //logger.debug('Error adding user to session. Session: ', req.session, '\nErr: ', err)
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
        })
    }
    else {
        //logger.debug('Session already contains user. Session: ', req.session)
        next()
    }
}

module.exports = middleware