const httpStatusCodes = require('../constants/httpStatusCodes')
const UnauthorizedError = require('../errors/Unauthorized')
const MongooseDuplicateKeyError = require('../errors/MongooseDuplicateKeyError')

const determineResponseMetaFromError = (err) => {
    const responseMeta = { data: err }

    if (err instanceof MongooseDuplicateKeyError) {
        responseMeta.statusCode = httpStatusCodes.CONFLICT
    }
    else if (err instanceof UnauthorizedError) {
        responseMeta.statusCode = httpStatusCodes.FORBIDDEN
    }
    else {
        responseMeta.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR
    }

    return responseMeta
}

module.exports = determineResponseMetaFromError