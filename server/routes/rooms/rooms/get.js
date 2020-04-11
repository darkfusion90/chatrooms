const { genericHandlerCallback } = require('../../routeUtils')
const { getRoom, getPublicRooms } = require('../../../controllers/rooms')
const { validateGetRoomsQuery } = require('../utils')
const httpStatusCodes = require('../../../constants/httpStatusCodes')

const handleGetPublicRooms = (req, res, callback) => {
    
    const { hasErrors, errors } = validateGetRoomsQuery({ ...req.query })
    if (hasErrors) {
        return res.status(httpStatusCodes.BAD_REQUEST).json(errors)
    }

    const { limit, offset } = req.query
    getPublicRooms(Number.parseInt(limit), Number.parseInt(offset), (err, rooms) => {
        if (rooms) {
            return res.json({ length: rooms.length, data: rooms })
        }
        callback(err, rooms)
    })
}

const get = (req, res) => {
    const callback = (err, doc) => genericHandlerCallback(err, doc, res)

    const { roomId } = req.params
    if (roomId) {
        return getRoom(roomId, callback)
    }

    handleGetPublicRooms(req, res, callback)
}

module.exports = get