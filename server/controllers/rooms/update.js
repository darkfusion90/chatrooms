const { Room } = require('../../models/Room')
const { executeQuery } = require('./utils')

const updateRoom = (roomId, updates, callback) => {
    const query = Room.findByIdAndUpdate(roomId, updates, { returnOriginal: false })
    return executeQuery(query, callback)
}

module.exports = { updateRoom }