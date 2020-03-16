const { getRoomByRoomId } = require('../../controllers/rooms')
const { ensureIsRoomMember, ensureIsRoomAdmin } = require('./helper')

const middleware = (req, _, next) => {
    const { userId } = req.session

    getRoomByRoomId(req.params.roomId).then(room => {
        if (!room) {
            return next()
        }
        console.log(room.name)

        switch (req.method) {
            case 'GET':
                return ensureIsRoomMember(userId, room, next)
            case 'POST':
                return ensureIsRoomAdmin(userId, room, next)
            default:
                next()
        }
    }).catch(err => { throw err })
}

module.exports = middleware