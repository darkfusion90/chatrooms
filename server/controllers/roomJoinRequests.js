const RoomJoinRequest = require('../models/RoomJoinRequest')
const isFunction = require('../utils/isFunction')


exports.createRoomJoinRequest = (requestedBy, room, callback) => {
    const promise = new Promise((resolve, reject) => {
        const roomJoinRequest = new RoomJoinRequest({
            requestedBy, room
        })

        roomJoinRequest.save().then(resolve).catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}

exports.deleteRoomJoinRequest = (requestId, callback) => {
    const promise = new Promise((resolve, reject) => {
        RoomJoinRequest.findByIdAndDelete(requestId)
            .then(resolve)
            .catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}