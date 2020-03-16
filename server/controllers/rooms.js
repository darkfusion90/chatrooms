const Room = require('../models/Room')
const messagesController = require('./messages')
const { createRoomMember, MEMBER_TYPE_ADMIN } = require('./roomMemberController')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')

const DEFAULT_PROJECTIONS = {
    '_id': 0,
    '__v': 0
}

const POPULATE_CONFIG = {
    createdBy: {
        path: 'createdBy',
        model: 'User',
        select: 'username isRegistered'
    },
    messages: {
        path: 'messages',
        model: 'Message',
        select: 'author atRoom data',
        populate: {
            path: 'author',
            model: 'User',
            select: 'username isRegistered'
        }
    },
    members: {
        path: 'members',
        model: 'RoomMember',
        select: 'user memberType',
        populate: {
            path: 'user',
            model: 'User',
            select: 'username isRegistered',
        }
    }
}

function generateRoomId() {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}

function populateApplicableFields(query) {
    const { createdBy, members, messages } = POPULATE_CONFIG
    return query.populate(members).populate(messages).populate(createdBy)
}

function addMemberToRoom(room, roomMember, callback) {
    populateApplicableFields(Room.findByIdAndUpdate(
        room._id,
        { $push: { members: roomMember } },
        { returnOriginal: false, fields: DEFAULT_PROJECTIONS })
    ).exec(callback)
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
        createRoomMember(room._id, creatorUserId, MEMBER_TYPE_ADMIN, (err, roomMember) => {
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
    populateApplicableFields(Room.find({ type: 'public' }, DEFAULT_PROJECTIONS)).exec(callback)
}

function getRoomByRoomId(roomId, callback) {
    const promise = new Promise((resolve, reject) => {
        populateApplicableFields(Room.findOne({ roomId: roomId }, DEFAULT_PROJECTIONS))
            .then(resolve).catch(reject)
    })

    if (callback && typeof callback === 'function') {
        promise.then(res => callback(null, res)).catch(callback)
    }

    return promise
}

function updateRoomByRoomId(roomId, updates, callback) {
    populateApplicableFields(Room.findOneAndUpdate(
        { roomId: roomId },
        updates,
        { returnOriginal: false, fields: DEFAULT_PROJECTIONS })
    ).exec(callback)
}

function addMessageToRoom(roomId, author, message, callback) {
    Room.findOne({ roomId }, (err, room) => {
        if (!room || err) return callback(err, room)
        messagesController.createMessage(author, roomId, message).then((messageDoc) => {
            updateRoomByRoomId(roomId, { $push: { messages: messageDoc } }, callback)
        }).catch(callback)
    })
}

function getRoomMessage(roomId, messageId, callback) {
    Room.findOne({ roomId: roomId, messages: messageId }, 'messages -_id')
        .populate(POPULATE_CONFIG.messages)
        .exec((err, room) => {
            if (room) {
                return callback(null, room.messages[0])
            }
            callback(err, room)
        })
}

function getAllMessagesInRoom(roomId, callback) {
    Room.findOne({ roomId: roomId }, 'messages -_id').populate(POPULATE_CONFIG.messages).exec(callback)
}

function deleteMessageFromRoom(roomId, messageId, callback) {
    populateApplicableFields(Room.findOneAndUpdate(roomId, { $pull: { messages: messageId } })).exec(callback)
}

function getRoomMember(roomId, memberId, callback) {
    Room.findOne({ roomId, members: memberId }, DEFAULT_PROJECTIONS)
        .populate(POPULATE_CONFIG.members)
        .exec((err, room) => callback(err, room ? room.members[0] : room))
}

function getAllRoomMembersOfRoom(roomId, callback) {
    Room.findOne({ roomId }, DEFAULT_PROJECTIONS)
        .populate(POPULATE_CONFIG.members)
        .exec((err, room) => callback(err, room ? room.members : room))
}

function addMemberToRoomByRoomId(roomId, memberData, callback) {
    Room.findOne({ roomId }, (err, room) => {
        if (err || !room) return callback(err, room)
        createRoomMember(room._id, memberData.userId, memberData.memberType)
            .then((roomMember) => {
                addMemberToRoom(room, roomMember, callback)
            }).catch(callback)
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
    deleteMessageFromRoom,
    getRoomMember,
    getAllRoomMembersOfRoom,
    addMemberToRoomByRoomId
}