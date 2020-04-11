const validator = require('validator').default
const isEmpty = require('is-empty')

const isUndefined = (what) => {
    return typeof what === 'undefined'
}

const isNegativeInteger = (what) => {
    return Number.parseInt(what) < 0
}

const validateGetRoomsQuery = (query = {}) => {
    const validateOffsetQuery = (offset) => {
        let error;
        if (!validator.isInt(offset)) {
            error = ' must be a whole number'
        } else {
            error = isNegativeInteger(offset) ? 'must be a non-negative whole number' : undefined
        }

        return error && `Query param "offset" ${error}`
    }

    const { limit, offset } = query

    //if no query is passed, we send all public rooms and hence, query == undefined is not
    //a 400 BAD REQUEST
    //NOTE: Do not check using falsy value (like if(!limit){...}) since null or false
    //are also falsy and they don't necessarily indicate a 'no-query-supplied' situation
    const errors = {}
    if (!isUndefined(limit) && !validator.isInt(limit)) {
        errors.limit = 'Query param "limit" must be a whole number'
    }

    if (!isUndefined(offset)) {
        const offsetErr = validateOffsetQuery(offset)
        if (offsetErr) errors.offset = offsetErr
    }

    return { hasErrors: !isEmpty(errors), errors }
}

const validateCreateRoomForm = (data = {}) => {
    const isValidRoomType = (roomType) => {
        return roomType === 'public' || roomType === 'private' || roomType === 'unlisted'
    }

    const errors = {}
    const { roomName, roomType } = data
    if (!roomName) {
        errors.roomNameEmpty = 'Room name is required'
    }

    if (!roomType) {
        errors.roomTypeEmpty = 'Room type is required'
    } else if (!isValidRoomType(roomType)) {
        errors.invalidRoomType = 'Room type should be either of "private", "public" or "unlisted"'
    }

    return {
        hasErrors: !isEmpty(errors),
        errors: errors
    }
}

module.exports = { validateGetRoomsQuery, validateCreateRoomForm }