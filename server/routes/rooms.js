const httpStatusCodes = require('../constants/httpStatusCodes')
const utils = require('./utils')
const createRoomFormValidator = require('../utils/createRoomFormValidator')
const { createRoom, deleteRoom, getAllPublicRooms, getRoomByRoomId, updateRoomByRoomId } = require('../controllers/rooms')

genericHandlerCallback = (err, resource, response, returnResourceOnSuccess = false) => {
    const statusCode = utils.determineStatusCode(err, resource)
    if (statusCode === httpStatusCodes.OK && returnResourceOnSuccess) {
        return resource
    }
    else {
        response.status(statusCode).json(resource ? resource : {})
        return false
    }
}

const get = (req, res) => {
    if (req.params.id) {
        getRoomByRoomId(req.params.id, (err, rawRoom) => {
            let room = genericHandlerCallback(err, rawRoom, res, true)
            let statusCode = httpStatusCodes.OK;
            if (room) {
                if (!room.userHasPermission(req.session.userId)) {
                    statusCode = httpStatusCodes.FORBIDDEN
                    room = {}
                }
                res.status(statusCode).json(room)
            }
        })
    }
    else {
        getAllPublicRooms((err, room) => genericHandlerCallback(err, room, res))
    }
}


const post = (req, res) => {
    const { errors, hasErrors } = createRoomFormValidator.validate(req.body)
    if (hasErrors) {
        res.status(httpStatusCodes.BAD_REQUEST).json(errors)
        return
    }

    createRoom(
        req.body.roomName,
        req.body.roomType,
        req.session.userId,
        (err, room) => genericHandlerCallback(err, room, res)
    )
}


const patch = (req, res) => {
    const { id } = req.params
    const { errors, hasErrors } = createRoomFormValidator.validate(req.body)
    if (hasErrors) {
        res.status(httpStatusCodes.BAD_REQUEST).json(errors)
        return
    }

    const toUpdate = {
        name: req.body.roomName,
        type: req.body.roomType
    }

    updateRoomByRoomId(id, req.session.userId, toUpdate, (err, room) => genericHandlerCallback(err, room, res))
}

const _delete = (req, res) => {
    deleteRoom(req.params.id, req.session.userId, (err, room) => genericHandlerCallback(err, room, res))
}

module.exports = { get, post, patch, _delete }