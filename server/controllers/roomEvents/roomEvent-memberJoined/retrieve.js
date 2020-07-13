const { RoomEventMemberJoined } = require('../../../models/RoomEvent')
const { executeQuery } = require('./utils')


const getAllRoomEventMemberJoinedInRoom = (roomId, callback) => {
    const query = RoomEventMemberJoined.find({ room: roomId })

    return executeQuery(query, callback)
}


module.exports = { getAllRoomEventMemberJoinedInRoom }