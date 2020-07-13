const { RoomEventMemberLeft } = require('../../models/RoomEvent')
const { saveDocument } = require('../util')


const createRoomEventMemberLeft = (userIdOfMember, roomId, callback) => {
    const memberLeft = new RoomEventMemberLeft({
        user: userIdOfMember,
        room: roomId
    })

    return saveDocument(memberLeft, callback)
}

module.exports = { createRoomEventMemberLeft }