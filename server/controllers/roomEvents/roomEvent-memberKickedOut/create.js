const { RoomEventMemberKickedOut } = require('../../../models/RoomEvent')
const { saveDocument } = require('../../util')


const createRoomEventMemberKickedOut = (whoKicked, victim, roomId, callback) => {
    const memberKickedOut = new RoomEventMemberKickedOut({
        whoKicked, victim, room: roomId
    })

    return saveDocument(memberKickedOut, callback)
}

module.exports = { createRoomEventMemberKickedOut }