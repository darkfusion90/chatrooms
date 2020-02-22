const httpStatusCodes = require('../constants/httpStatusCodes')
const UnauthorizedError = require('../errors/Unauthorized')
const MongooseDuplicateKeyError = require('../errors/MongooseDuplicateKeyError')

const determineResponseMetaFromError = (err) => {
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
        console.log(err)
        responseMeta.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR
        responseMeta.data = {}
    }

    return responseMeta
}

const determineResponseMeta = (err, resource) => {
    let responseMeta = {}

    if (err) {
        responseMeta = determineResponseMetaFromError(err)
    } else if (!resource) {
        responseMeta.statusCode = httpStatusCodes.RESOURCE_NOT_FOUND
        responseMeta.data = {}
    } else {
        responseMeta.statusCode = httpStatusCodes.OK
        responseMeta.data = resource
    }

    return responseMeta
}

genericHandlerCallback = (err, resource, response, returnResourceOnSuccess = false) => {
    const { statusCode, data } = determineResponseMeta(err, resource)

    if (statusCode === httpStatusCodes.OK && returnResourceOnSuccess) {
        return resource
    }

    response.status(statusCode).json(data)
}

module.exports = { genericHandlerCallback }