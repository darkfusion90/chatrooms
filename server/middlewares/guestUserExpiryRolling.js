const { getUserWithExpiresAtField, updateUserDocumentExpirationDate } = require('../controllers/users')
const logger = require('../utils/logger')('[GuestUserExpiryRolling]')
const config = require('../config/config')

module.exports = (req, res, next) => {
    const { userId } = req.session

    if (!userId) {
        next(new Error('Session userId missing in user expiry rolling middleware'))
    } else {
        getUserWithExpiresAtField(userId).then((user) => {
            if (user.isRegistered) {
                logger.debug('Skipping rolling of registered user')
                return next()
            }
            const userDocumentExpiresAt = new Date(user.expiresAt)
            logger.debug('Expiration date before rolling: ', userDocumentExpiresAt)

            const currentDateObject = new Date()
            const millisecondsPerHour = 3600000
            userDocumentExpiresAt.setHours(currentDateObject.getHours() + config.GUEST_USER_DB_DOCUMENT_MAX_AGE_MILLISECONDS / millisecondsPerHour)
            logger.debug('Expiration date after rolling: ', userDocumentExpiresAt)

            updateUserDocumentExpirationDate(userId, userDocumentExpiresAt, (err, user) => {
                if (user) {
                    logger.debug('User expiresAt updated: ', user)
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