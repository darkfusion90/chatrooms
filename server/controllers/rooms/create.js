const { Room } = require('../../models/Room')
const uniqueIdGenerator = require('../../utils/uniqueIdGenerator')

const generateRoomId = () => {
    return uniqueIdGenerator.generateIdUsingRandomWords()
}

const createRoom = (name, type, createdBy, callback) => {
    const room = new Room({ _id: generateRoomId(), name, type, createdBy })

    room.save().then(doc => callback(null, doc)).catch(callback)
}

module.exports = { createRoom }