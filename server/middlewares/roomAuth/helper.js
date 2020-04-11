const UnauthorizedError = require('../../errors/Unauthorized')
const { REASON } = require('../../constants/apiResponseConstants')
const { getRoomMemberHavingUserId } = require('../../controllers/roomMembers')

const ensureIsRoomAdmin = async (userId, room, next) => {
    let roomMemberReference;
    try {
        roomMemberReference = await getRoomMemberHavingUserId(room._id, userId)
    } catch (error) {
        next(error)
    } finally {
        if (roomMemberReference && roomMemberReference.isAdmin()) {
            return next()
        }

        next(new UnauthorizedError(REASON.NOT_A_ROOM_ADMIN))
    }
}

const ensureIsRoomMember = async (userId, room, next) => {
    let roomMemberReference;
    try {
        roomMemberReference = await getRoomMemberHavingUserId(room._id, userId)
    } catch (error) {
        next(error)
    } finally {
        if (roomMemberReference) {
            return next()
        }
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