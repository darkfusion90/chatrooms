const { createRoom } = require('../../../controllers/rooms')
const { createRoomMember } = require('../../../controllers/roomMembers')

const memberTypes = require('../../../constants/memberTypes')
const httpStatusCodes = require('../../../constants/httpStatusCodes')

const { genericHandlerCallback } = require('../../routeUtils')
const { validateCreateRoomForm } = require('../utils')


const post = async (req, res) => {
    const { errors, hasErrors } = validateCreateRoomForm(req.body)
    if (hasErrors) {
        res.status(httpStatusCodes.BAD_REQUEST).json(errors)
        return
    }

    const { roomName, roomType } = req.body
    const { userId } = req.session

    const callback = (err, data) => genericHandlerCallback(err, data, res)
    createRoom(roomName, roomType, userId, (err, room) => {
        if (err || !room) return callback(err, room)

        createRoomMember(room._id, userId, memberTypes.MEMBER_TYPE_ADMIN)
            .then(roomMemberDoc => {
                if (!roomMemberDoc) return callback()
                res.json(room)
            }).catch(callback)
    })
}

module.exports = post