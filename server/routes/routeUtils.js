const httpStatusCodes = require('../constants/httpStatusCodes')
const determineResponseMetaFromError = require('../utils/errorResponseMetaCreator')
const logger = require('../utils/logger')('[RouteUtils] ')

const determineResponseMeta = (err, resource) => {
    let responseMeta = {}

    if (err) {
        logger.debug("Error in handler: ", err)
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

exports.genericHandlerCallback = (err, resource, response) => {
    const { statusCode, data } = determineResponseMeta(err, resource)
    response.status(statusCode).json(data)
}

exports.defaultCallback = response => (err, resource) => {
    const { statusCode, data } = determineResponseMeta(err, resource)
    response.status(statusCode).json(data)
}

exports.createLengthBasedResponse = (resource, resourceName) => {
    const _createResponse = (data) => {
        return { length: data.length, [resourceName]: data }
    }

    if (resource) {
        return Array.isArray(resource) ?
            _createResponse(resource) :
            _createResponse([resource])
    }

    return _createResponse([])
}

exports.handleArrayResponse = (res, resourceName) => (err, data) => {
    exports.defaultCallback(res)(err, exports.createLengthBasedResponse(data, resourceName))
}