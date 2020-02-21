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

module.exports = { determineStatusCode }