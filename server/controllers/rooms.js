const Room = require('../models/Room')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[RoomsController] ')

function generateRoomId() {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}

function createRoom(name, type, owner, callback) {
    const roomId = generateRoomId()
    const room = new Room({ roomId, name, type, owner })
    room.save((err) => {
        if (err) {
            logger.debug("Error creating room: ", room)
            logger.debug(err)
            callback(err, null)
        }
        else {
            logger.debug("Successfully created room: ", room)
            callback(null, room)
        }
    })
}

function getAllPublicRooms(callback) {
    Room.find({ type: 'public' }, callback)
}

function getRoomByRoomId(roomId, callback) {
    Room.findOne({ roomId: roomId }, callback)
}

function updateRoomByRoomId(roomId, userId, updatedValues, callback) {
    Room.findOneAndUpdate({ roomId: roomId, owner: userId }, updatedValues, { returnOriginal: false }, callback)
}

module.exports = { createRoom, getAllPublicRooms, getRoomByRoomId, updateRoomByRoomId }