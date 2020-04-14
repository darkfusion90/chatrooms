const RoomMember = require('../../models/RoomMember')
const { executeQuery } = require('./utils')


const getRoomMemberHavingUserId = (roomId, userId, callback) => {
    const query = RoomMember.findOne({ room: roomId, user: userId })

    return executeQuery(query, callback)
}

const getAllMembersOfRoom = (roomId, callback) => {
    const query = RoomMember.find({ room: roomId })

    return executeQuery(query, callback)
}

const getRoomMember = (memberId, roomId, callback) => {
    const query = RoomMember.findOne({ _id: memberId, room: roomId })

    return executeQuery(query, callback)
}

const searchUserInRoom = (roomId, userId, callback) => {
    const query = RoomMember.find({ room: roomId, user: userId })

    return executeQuery(query, callback)
}

module.exports = {
    getRoomMemberHavingUserId,
    getAllMembersOfRoom,
    getRoomMember,
    searchUserInRoom
}