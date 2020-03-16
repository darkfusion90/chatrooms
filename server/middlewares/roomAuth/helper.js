const UnauthorizedError = require('../../errors/Unauthorized')

const errMsg = 'You do not have the required permission(s) to perform this operation'
const roomAuthFailedError = new UnauthorizedError(errMsg)

const ensureIsRoomAdmin = (userId, room, next) => {
    if (room.isAdmin(userId)) {
        next()
    } else {
        next(roomAuthFailedError)
    }
}

const ensureIsRoomMember = (userId, room, next) => {
    if (room.isMember(userId)) {
        next()
    } else {
        next(roomAuthFailedError)
    }
}

module.exports = {
    ensureIsRoomAdmin,
    ensureIsRoomMember
}