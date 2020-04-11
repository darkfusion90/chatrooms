const { Room } = require('../../models/Room')
const { executeQuery } = require('./utils')

const deleteRoom = (roomId, callback) => {
    const query = Room.findByIdAndDelete(roomId)

    return executeQuery(query, callback)
}

module.exports = { deleteRoom }