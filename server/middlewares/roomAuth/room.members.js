const { getRoom } = require('../../controllers/rooms')
const UnauthorizedError = require('../../errors/Unauthorized')
const { REASON } = require('../../constants/apiResponseConstants')
const { ensureIsRoomMember, ensureIsRoomAdmin, isPrivateRoom } = require('./helper')
const { getRoomMember } = require('../../controllers/roomMembers')

const handleDeleteRoomMemberAuth = async (room, memberId, userId, next) => {
    const isUserAttemptingSelfDelete = async () => {
        let memberRef;
        try {
            memberRef = await getRoomMember(memberId, room._id)
        } catch (err) {
            next(err)
        } finally {
            return memberRef && memberRef.user._id === userId
        }
    }

    if (isUserAttemptingSelfDelete()) {
        return next()
    }

    ensureIsRoomAdmin(userId, room, next)
}

const handlePostRoomMemberAuth = (room, next) => {
    if (isPrivateRoom(room)) {
        next(new UnauthorizedError(REASON.NOT_A_ROOM_ADMIN))
    } else {
        next()
    }
}

const middleware = (req, _, next) => {
    const { userId } = req.session
    const { roomId, memberId } = req.params

    getRoom(roomId).then(room => {
        if (!room) {
            return next()
        }

        switch (req.method) {
            case 'GET':
                return ensureIsRoomMember(userId, room, next)
            case 'POST':
                return handlePostRoomMemberAuth(room, next)
            case 'DELETE':
                return handleDeleteRoomMemberAuth(room, memberId, userId, next)
            default:
                next()
        }
    }).catch(err => { throw err })
}

module.exports = middleware