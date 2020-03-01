const Room = require('../models/Room')
const messagesController = require('./messages')
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

function deleteRoom(roomId, userId, callback) {
    Room.findOneAndDelete({ roomId: roomId, owner: userId }, callback)
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

function addMessageToRoom(roomId, userId, message, callback) {
    messagesController.createMessage(userId, roomId, message, (err, messageDoc) => {
        if (messageDoc) {
            updateRoomByRoomId(roomId, userId, { $push: { 'messages': messageDoc._id } }, callback)
        }
        else {
            callback(err, messageDoc)
        }
    })
}

function getRoomMessage(roomId, messageId, callback) {
    Room.findOne({ roomId: roomId, messages: messageId }, (err, room) => {
        if (!err && room) {
            return messagesController.getMessage(messageId, callback)
        }
        callback(err, room)
    })
}

function getAllMessagesInRoom(roomId, callback) {
    Room.findOne({ roomId: roomId }, async (err, room) => {
        if (room) {
            const messages = await Promise.all(room.messages.map(messageId => {
                return messagesController.getMessage(messageId)
            }))
            callback(null, messages)
        }
        else {
            callback(err, null)
        }
    })
}


module.exports = {
    createRoom,
    deleteRoom,
    updateRoomByRoomId,
    getRoomByRoomId,
    getAllPublicRooms,
    getRoomMessage,
    getAllMessagesInRoom,
    addMessageToRoom,
}