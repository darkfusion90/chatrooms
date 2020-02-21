const httpStatusCodes = require('../constants/httpStatusCodes')
const UnauthorizedError = require('../errors/Unauthorized')

const determineStatusCode = (err, resource) => {
    if (err) {
        return err instanceof UnauthorizedError ?
            httpStatusCodes.FORBIDDEN :
            httpStatusCodes.INTERNAL_SERVER_ERROR
    }
    else if (!resource) {
        return httpStatusCodes.RESOURCE_NOT_FOUND
    }
    else {
        return httpStatusCodes.OK
    }
}

genericHandlerCallback = (err, resource, response, returnResourceOnSuccess = false) => {
    const statusCode = determineStatusCode(err, resource)
    if (statusCode === httpStatusCodes.OK && returnResourceOnSuccess) {
        return resource
    }
    else {
        response.status(statusCode).json(resource ? resource : {})
        return false
    }
}

module.exports = { genericHandlerCallback }