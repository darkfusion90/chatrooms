const httpStatusCodes = require('../constants/httpStatusCodes')
const determineResponseMetaFromError = require('../utils/errorResponseMetaCreator')

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

genericHandlerCallback = (err, resource, response) => {
    const { statusCode, data } = determineResponseMeta(err, resource)
    response.status(statusCode).json(data)
}

module.exports = { genericHandlerCallback }