const determineResponseMetaFromError = require('../utils/errorResponseMetaCreator')

module.exports = (err, _, res, next) => {
    if (res.headersSent) {
        next(err)
    }

    const { statusCode, data } = determineResponseMetaFromError(err)
    res.status(statusCode).json(data)
}