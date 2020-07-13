const { RoomEventMemberKickedOut } = require('../../../models/RoomEvent')
const { executeQuery } = require('./utils')

const getAllRoomEventMemberKickedOut = (whoKicked, victim, roomId, callback) => {
    const query = 

    return executeQuery(query, callback)
}


module.exports = { getAllRoomEventMemberKickedOut }