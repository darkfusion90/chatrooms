const { getRoomByRoomId } = require('../../controllers/rooms')
const { ensureIsRoomMember, ensureIsRoomAdmin, isPrivateRoom, roomAuthFailedError } = require('./helper')

const handleDeleteRoomMemberAuth = (room, memberId, userId, next) => {
    const isUserAttemptingSelfDelete = () => {
        let memberDocOfUser;
        room.members.forEach(member => {
            if (member && member.user && member.user._id.equals(userId)) {
                memberDocOfUser = member
            }
        })

        return memberDocOfUser && memberDocOfUser._id.equals(memberId)
    }

    if (isUserAttemptingSelfDelete()) {
        return next()
    }

    ensureIsRoomAdmin(userId, room, next)
}

const handlePostRoomMemberAuth = (room, next) => {
    if (isPrivateRoom(room)) {
        next(roomAuthFailedError)
    } else {
        next()
    }
}

const middleware = (req, _, next) => {
    const { userId } = req.session
    const { roomId, memberId } = req.params

    getRoomByRoomId(roomId).then(room => {
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