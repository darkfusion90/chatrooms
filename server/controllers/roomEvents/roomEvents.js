const { RoomEvent } = require('../../models/RoomEvent')
const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const createRoomEvent = (type, meta, callback) => {
    const roomEvent = new RoomEvent({ type, meta })
    return createPromiseCallbackFunction((resolve, reject) => {
        roomEvent.save().then(resolve, reject)
    }, callback)
}

module.exports = { createRoomEvent }