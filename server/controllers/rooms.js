const Room = require('../models/Room')
const messagesController = require('./messages')
const roomMemberController = require('./roomMemberController')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[RoomsController] ')

function generateRoomId() {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}

async function createRoom(name, type, creator, callback) {
    const roomId = generateRoomId()
    const room = new Room({
        roomId: roomId,
        name: name,
        type: type,
        createdBy: creator,
        createdAt: Date.now(),
    })
    room.save().then(async room => {
        logger.debug("Successfully created room: ", room)
        const roomMemberCreator = await roomMemberController.createRoomMember(creator, roomMemberController.MEMBER_TYPE_ADMIN)
        room.updateOne({ $push: { 'members': roomMemberCreator } }).
            then(room => {
                callback(null, room)
            })
            .catch(err => {
                callback(err, null)
            })
    }).catch(err => {
        logger.debug("Error creating room: ", room)
        logger.debug(err)
        callback(err, null)
    })
}

function deleteRoom(roomId, callback) {
    Room.findOneAndDelete({ roomId: roomId }, callback)
}

function getAllPublicRooms(callback) {
    Room.find({ type: 'public' }, callback)
}

function getRoomByRoomId(roomId, callback) {
    Room.findOne({ roomId: roomId }, callback)
}

function updateRoomByRoomId(roomId, updatedValues, callback) {
    Room.findOneAndUpdate({ roomId: roomId }, updatedValues, { returnOriginal: false }, callback)
}

function addMessageToRoom(roomId, author, message, callback) {
    Room.findOne({ roomId }, (err, room) => {
        if (!room || err) callback(err, room)
        messagesController.createMessage(author, roomId, message, (err, messageDoc) => {
            if (!messageDoc || err) callback(err, messageDoc)
            room.update({ $push: { 'messages': messageDoc } })
        })
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