const RoomJoinRequest = require('../../models/RoomJoinRequest')
const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const createRoomJoinRequest = (requesterId, roomId, callback) => {
    const roomJoinRequest = new RoomJoinRequest({
        requestedBy: requesterId,
        room: roomId
    })

    return createPromiseCallbackFunction((resolve, reject) => {
        roomJoinRequest.save().then(resolve).catch(reject)
    }, callback)
}

module.exports = { createRoomJoinRequest }