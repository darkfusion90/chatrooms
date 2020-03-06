const determineResponseMetaFromError = require('../utils/errorResponseMetaCreator')
const logger = require('../utils/logger')('[ExpressErrorHandler] ')

module.exports = (err, _, res, next) => {
    logger.debug('Error encountered: ', err)
    if (res.headersSent) {
        logger.debug('Headers sent. Calling next middleware: ')
        next(err)
    }

    logger.debug('Will determine response meta from error: ')
    const { statusCode, data } = determineResponseMetaFromError(err)
    res.status(statusCode).json(data)
}