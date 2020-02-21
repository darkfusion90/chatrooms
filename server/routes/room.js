const httpErrorCodes = require('../constants/httpErrorCodes')
const UnauthorizedError = require('../errors/Unauthorized')
const { createRoom, getAllPublicRooms, getRoomByRoomId, updateRoomByRoomId } = require('../controllers/rooms')

genericHandlerCallback = (err, resource, response) => {
    if (err) {
        const errCode = err instanceof UnauthorizedError ?
            httpErrorCodes.FORBIDDEN :
            httpErrorCodes.INTERNAL_SERVER_ERROR

        response.status(errCode).json({})
    }
    else if (!resource) {
        response.status(httpErrorCodes.RESOURCE_NOT_FOUND).json({})
    }
    response.send(resource)
}

const get = (req, res) => {
    if (req.params.id) {
        getRoomByRoomId(req.params.id, (err, room) => genericHandlerCallback(err, room, res))
    }

    else {
        getAllPublicRooms((err, room) => genericHandlerCallback(err, room, res))
    }
}

const post = (req, res) => {
    createRoom(
        req.body.roomName,
        req.body.roomType,
        req.session.userId,
        (err, room) => genericHandlerCallback(err, room, res)
    )
}


const patch = (req, res) => {
    const { id } = req.params
    updateRoomByRoomId(id, req.session.userId, { name: req.body.roomName }, function (err, room) {
        if (err) {
            if (err instanceof UnauthorizedError) {
                res.status(httpErrorCodes.FORBIDDEN).json({})
            }
            else {
                res.status(httpErrorCodes.INTERNAL_SERVER_ERROR).json({})
            }
        }
        else if (!room) {
            res.status(httpErrorCodes.RESOURCE_NOT_FOUND).json({})
        }
        res.json(room)
    })
}

module.exports = { get, post, patch }