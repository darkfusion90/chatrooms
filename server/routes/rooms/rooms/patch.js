const { genericHandlerCallback } = require('../../routeUtils')
const { updateRoom } = require('../../../controllers/rooms')
const { validateCreateRoomForm } = require('../utils')
const httpStatusCodes = require('../../../constants/httpStatusCodes')

const patch = (req, res) => {
    const { roomId } = req.params

    const { errors, hasErrors } = validateCreateRoomForm(req.body)
    if (hasErrors) {
        res.status(httpStatusCodes.BAD_REQUEST).json(errors)
        return
    }

    const toUpdate = {
        name: req.body.roomName,
        type: req.body.roomType
    }

    updateRoom(roomId, toUpdate, (err, room) => genericHandlerCallback(err, room, res))
}


module.exports = patch