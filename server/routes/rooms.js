const httpStatusCodes = require('../constants/httpStatusCodes')
const { genericHandlerCallback } = require('./routeUtils')
const getCurrentUserDocument = require('../utils/getCurrentUserDocument')
const createRoomFormValidator = require('../utils/createRoomFormValidator')
const roomMessages = require('./roomMessages')
const {
    createRoom,
    deleteRoom,
    getAllPublicRooms,
    getRoomByRoomId,
    updateRoomByRoomId
} = require('../controllers/rooms')

const get = (req, res) => {
    if (req.params.id) {
        getRoomByRoomId(req.params.id, (err, room) => genericHandlerCallback(err, room, res))
    }
    else {
        getAllPublicRooms((err, room) => genericHandlerCallback(err, room, res))
    }
}


const post = async (req, res) => {
    const { errors, hasErrors } = createRoomFormValidator.validate(req.body)
    if (hasErrors) {
        res.status(httpStatusCodes.BAD_REQUEST).json(errors)
        return
    }

    const currentUserDoc = await getCurrentUserDocument(req);
    if (currentUserDoc instanceof Error) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    createRoom(
        req.body.roomName,
        req.body.roomType,
        currentUserDoc,
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
    deleteRoom(req.params.id, (err, room) => genericHandlerCallback(err, room, res))
}

module.exports = { get, post, patch, _delete, roomMessages }