const { Room } = require('../../models/Room')
const { executeQuery } = require('./utils')
const createPromiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const getPublicRooms = (limit, offset, callback) => {
    const query = Room.find({ type: 'public' }).limit(limit).skip(offset)

    return executeQuery(query, callback)
}

const getRoom = (roomId, callback) => {
    const query = Room.findById(roomId)

    return executeQuery(query, callback)
}

const countAllPublicRooms = (callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        Room.find({ type: 'public' })
            .then(results => resolve(results.length))
            .catch(reject)
    }, callback)
}

module.exports = { getPublicRooms, getRoom, countAllPublicRooms }