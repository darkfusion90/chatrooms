const Room = require('../models/Room')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[RoomsController] ')

function generateRoomId() {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}


function createRoom(name, type, owner, callback) {
    const roomId = generateRoomId()
    const room = new Room({ roomId, name, type, owner })
    room.save((err) => {
        if (err) {
            logger.debug("Error creating room: ", room)
            logger.debug(err)
            callback(err)
        }
        else {
            logger.debug("Successfully created room: ", room)
            callback({ status: 'success', 'roomId': roomId })
        }
    })
}

module.exports = { createRoom }