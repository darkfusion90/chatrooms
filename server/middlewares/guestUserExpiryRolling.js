const { getUserWithExpiresAtField, updateUserDocumentExpirationDate } = require('../controllers/users')
const addUserToSession = require('../utils/addUserToSession')
const logger = require('../utils/logger')('[GuestUserExpiryRolling]')
const config = require('../config/config')

const isRegisterPath = (path) => {
    return /^\/api\/register(\/){0,1}$/.test(path)
}

module.exports = (req, res, next) => {
    const { userId } = req.session
    if (isRegisterPath(req.path) || req.session.redirectedFromRegister) {
        next()
    }
    else if (!userId) {
        next(new Error('Session userId missing in user expiry rolling middleware'))
    } else {
        getUserWithExpiresAtField(userId).then((user) => {
            if (!user) {
                addUserToSession(req).then((user) => {
                    logger.debug('User successfully added to session. Session: ', req.session, '\nUser: ', user)
                    next()
                }).catch(err => {
                    logger.debug('Error adding user to session. Session: ', req.session, '\nErr: ', err)
                    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
                })
            }

            if (user.isRegistered) {
                //logger.debug('Skipping rolling of registered user')
                return next()
            }
            const userDocumentExpiresAt = new Date(user.expiresAt)
            //logger.debug('Expiration date before rolling: ', userDocumentExpiresAt)

            const currentDateObject = new Date()
            const millisecondsPerHour = 3600000
            userDocumentExpiresAt.setHours(currentDateObject.getHours() + config.GUEST_USER_DB_DOCUMENT_MAX_AGE_MILLISECONDS / millisecondsPerHour)
            //logger.debug('Expiration date after rolling: ', userDocumentExpiresAt)

            updateUserDocumentExpirationDate(userId, userDocumentExpiresAt, (err, user) => {
                if (user) {
                    //      logger.debug('User expiresAt updated: ', user)
                    next()
                } else if (!user) {
                    next(new Error('Empty user document received on rolling attempt'))
                } else {
                    next(err)
                }
            })
        })
    }
}