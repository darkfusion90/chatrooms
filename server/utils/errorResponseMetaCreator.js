const httpStatusCodes = require('../constants/httpStatusCodes')
const UnauthorizedError = require('../errors/Unauthorized')
const MongooseDuplicateKeyError = require('../errors/MongooseDuplicateKeyError')

const determineResponseMetaFromError = (err) => {
    console.log('Error: ', err)
    const responseMeta = {}

    if (err instanceof MongooseDuplicateKeyError) {
        responseMeta.statusCode = httpStatusCodes.CONFLICT
        responseMeta.data = err
    }
    else if (err instanceof UnauthorizedError) {
        responseMeta.statusCode = httpStatusCodes.FORBIDDEN
        responseMeta.data = {}
    }
    else {
        responseMeta.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR
        responseMeta.data = {}
    }

    return responseMeta
}

module.exports = determineResponseMetaFromError