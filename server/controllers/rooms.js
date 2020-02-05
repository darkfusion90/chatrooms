const Room = require('../models/Room')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')

function generateRoomId() {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}


function createRoom(name, type, owner, callback) {
    const roomId = generateRoomId()
    const room = new Room({ roomId, name, type, owner })
    room.save((err) => {
        if (err) {
            console.log("Error creating room: ", room)
            console.log(err)
            callback(err)
        }
        else {
            console.log("Successfully created room: ", room)
            callback({ status: 'success', 'roomId': roomId })
        }
    })
}

module.exports = { createRoom }