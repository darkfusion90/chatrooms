const Room = require('../models/Room')
const messagesController = require('./messages')
const roomMemberController = require('./roomMemberController')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[RoomsController] ')

function generateRoomId() {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}

function addMemberToRoom(room, roomMember, callback) {
    Room.findByIdAndUpdate(room._id, { $push: { members: roomMember } }, { returnOriginal: false })
        .populate('createdBy').exec(callback)
}

function createRoom(name, type, creatorUserId, callback) {
    const roomId = generateRoomId()
    const room = new Room({
        roomId: roomId,
        name: name,
        type: type,
        createdBy: creatorUserId,
        createdAt: Date.now(),
    })
    room.save().then(_ => {
        roomMemberController.createRoomMember(room._id, creatorUserId, 'admin', (err, roomMember) => {
            if (err || !roomMember) {
                return callback(err, roomMember)
            }
            addMemberToRoom(room, roomMember, callback)
        })
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