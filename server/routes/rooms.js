const httpStatusCodes = require('../constants/httpStatusCodes')
const { genericHandlerCallback } = require('./routeUtils')
const createRoomFormValidator = require('../utils/createRoomFormValidator')
const roomMessages = require('./roomMessages')
const {
    createRoom,
    deleteRoom,
    getAllPublicRooms,
    getRoomByRoomId,
    updateRoomByRoomId
} = require('../controllers/rooms')
const logger = require('../utils/logger')('[RoomsRoute] ')

const get = (req, res) => {
    if (req.params.id) {
        getRoomByRoomId(req.params.id, (err, room) => genericHandlerCallback(err, room, res))
    }
    else {
        getAllPublicRooms((err, room) => genericHandlerCallback(err, room, res))
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

    updateRoomByRoomId(id, toUpdate, (err, room) => genericHandlerCallback(err, room, res))
}

const _delete = (req, res) => {
    deleteRoom(req.params.id, (err, _) => genericHandlerCallback(err, { 'nDeleted': 1 }, res))
}

module.exports = { get, post, patch, _delete, roomMessages }