const RoomMember = require('../../models/RoomMember')
const { executeQuery } = require('./utils')

const deleteRoomMember = (memberId, roomId, callback) => {
    const query = RoomMember.findOneAndDelete({ _id: memberId, room: roomId })

    return executeQuery(query, callback)
}

module.exports = { deleteRoomMember }