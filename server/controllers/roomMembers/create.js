const RoomMember = require('../../models/RoomMember')
const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')

const createRoomMember = (roomId, userId, memberType, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        const roomMember = new RoomMember({ room: roomId, user: userId, memberType })
        roomMember.save().then(resolve).catch(reject)
    }, callback)
}

module.exports = { createRoomMember }