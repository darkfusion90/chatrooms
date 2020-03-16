const { getRoomByRoomId } = require('../../controllers/rooms')
const { ensureIsRoomAdmin, ensureIsRoomMember } = require('./helper')

const isPrivateRoom = (room) => {
    return room.type === 'private'
}

const handleRoomGetAuth = (req, next, room) => {
    const { userId } = req.session

    if (isPrivateRoom(room)) {
        ensureIsRoomMember(userId, room, next)
    } else {
        next()
    }
}

const middleware = async (req, _, next) => {
    getRoomByRoomId(req.params.roomId).then(room => {
        if (!room) {
            return next()
        }
        console.log(room.name)
        switch (req.method) {
            case 'GET':
                return handleRoomGetAuth(req, next, room)
            case 'PATCH':
            case 'DELETE':
                return ensureIsRoomAdmin(req.session.userId, room, next)
            default:
                next()
        }
    }).catch(err => { throw err })
}

module.exports = middleware