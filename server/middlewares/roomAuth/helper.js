const UnauthorizedError = require('../../errors/Unauthorized')
const { REASON } = require('../../constants/apiResponseConstants')

const ensureIsRoomAdmin = (userId, room, next) => {
    if (room.isAdmin(userId)) {
        next()
    } else {
        next(new UnauthorizedError(REASON.NOT_A_ROOM_ADMIN))
    }
}

const ensureIsRoomMember = (userId, room, next) => {
    if (room.isMember(userId)) {
        next()
    } else {
        next(new UnauthorizedError(REASON.NOT_A_ROOM_MEMBER))
    }
}

const isPrivateRoom = (room) => {
    return room.type === 'private'
}

module.exports = {
    ensureIsRoomAdmin,
    ensureIsRoomMember,
    isPrivateRoom
}