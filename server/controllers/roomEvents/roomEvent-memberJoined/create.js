const { RoomEventMemberJoined } = require('../../../models/RoomEvent')
const { saveDocument } = require('../../util')


const createRoomEventMemberJoined = (userIdOfMember, roomId, callback) => {
    const memberJoined = new RoomEventMemberJoined({
        user: userIdOfMember,
        room: roomId
    })

    return saveDocument(memberJoined, callback)
}

module.exports = { createRoomEventMemberJoined }