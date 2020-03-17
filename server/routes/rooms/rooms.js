const httpStatusCodes = require('../../constants/httpStatusCodes')
const { genericHandlerCallback } = require('../routeUtils')
const createRoomFormValidator = require('../../utils/createRoomFormValidator')

const {
    createRoom,
    deleteRoom,
    getAllPublicRooms,
    getRoomByRoomId,
    updateRoomByRoomId
} = require('../../controllers/rooms')
const logger = require('../../utils/logger')('[RoomsRoute] ')

const get = (req, res) => {
    if (req.params.roomId) {
        getRoomByRoomId(req.params.roomId, (err, room) => genericHandlerCallback(err, room, res))
    }
    else {
        getAllPublicRooms((err, rooms) => genericHandlerCallback(err, rooms, res))
    }
}

const post = async (req, res) => {
    logger.debug('POST. req.body: ', req.body)
    const { errors, hasErrors } = createRoomFormValidator.validate(req.body)
    if (hasErrors) {
        logger.debug('Bad Request: ', req.body)
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
    const { roomId } = req.params
    const { errors, hasErrors } = createRoomFormValidator.validate(req.body)
    if (hasErrors) {
        res.status(httpStatusCodes.BAD_REQUEST).json(errors)
        return
    }

    const toUpdate = {
        name: req.body.roomName,
        type: req.body.roomType
    }

    updateRoomByRoomId(roomId, toUpdate, (err, room) => genericHandlerCallback(err, room, res))
}

const _delete = (req, res) => {
    deleteRoom(req.params.roomId, (err, room) => {
        const responseData = { 'nDeleted': room ? 1 : 0 }
        genericHandlerCallback(err, responseData, res)
    })
}

module.exports = { get, post, patch, _delete }