const RoomJoinRequest = require('../../models/RoomJoinRequest')
const { executeQuery } = require('./utils')


const getJoinRequestInRoom = (roomId, requestId, callback) => {
    const query = RoomJoinRequest.findOne({ _id: requestId, room: roomId })
    return executeQuery(query, callback)
}

const getAllJoinRequestsInRoom = (roomId, callback) => {
    const query = RoomJoinRequest.find({ room: roomId })
    return executeQuery(query, callback)
}

const getJoinRequestByUser = (userId, requestId, callback) => {
    const query = RoomJoinRequest.findOne({ _id: requestId, requestedBy: userId })
    return executeQuery(query, callback)
}

const getAllJoinRequestsByUser = (userId, callback) => {
    const query = RoomJoinRequest.find({ requestedBy: userId })
    return executeQuery(query, callback)
}


module.exports = {
    getJoinRequestInRoom,
    getAllJoinRequestsInRoom,
    getJoinRequestByUser,
    getAllJoinRequestsByUser,
}