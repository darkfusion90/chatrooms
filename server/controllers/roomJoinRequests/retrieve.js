const RoomJoinRequest = require('../../models/RoomJoinRequest')
const { executeQuery } = require('./utils')


const getAllJoinRequestsInRoom = (roomId, callback) => {
    const query = RoomJoinRequest.find({ room: roomId })
    return executeQuery(query, callback)
}

const getJoinRequest = (roomId, requestId, callback) => {
    const query = RoomJoinRequest.findOne({ room: roomId, requestedBy: requestId })
    return executeQuery(query, callback)
}


module.exports = {
    getAllJoinRequestsInRoom,
    getJoinRequest
}