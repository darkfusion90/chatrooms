const Room = require('../models/Room');
const crypto = require('crypto')

function createRoom(id, name, type, owner, callback) {
    console.log("MY CRYPTO: ", crypto.randomBytes(16).toString('base64'))
    console.log("ROOM ID: " + id)
    const room = new Room({ id, name, type, owner })
    room.save((err) => {
        if (err) {
            console.log("Error creating room: ", room)
            console.log(err)
            callback(err);
        }
        else {
            console.log("Successfully created room: ", room)
            callback({ status: 'success', 'roomId': id })
        }
    })
}

module.exports = { createRoom }