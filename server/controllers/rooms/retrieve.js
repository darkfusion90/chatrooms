const { Room } = require('../../models/Room')
const { executeQuery } = require('./utils')


const getPublicRooms = (limit, offset, callback) => {
    const query = Room.find({ type: 'public' }).limit(limit).skip(offset)

    return executeQuery(query, callback)
}

const getRoom = (roomId, callback) => {
    const query = Room.findById(roomId)

    return executeQuery(query, callback)
}

const countAllPublicRooms = (callback) => {
    const query = Room.estimatedDocumentCount()

    return executeQuery(query, callback)
}

module.exports = { getPublicRooms, getRoom, countAllPublicRooms }