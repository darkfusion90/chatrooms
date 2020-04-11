const Message = require('../../models/Message')
const { executeQuery } = require('./utils')

const getMessage = (messageId, roomId, callback) => {
    const query = Message.findOne({ _id: messageId, atRoom: roomId })

    return executeQuery(query, callback)
}

const getAllMessagesOfRoom = (roomId, callback) => {
    const query = Message.find({ atRoom: roomId })

    return executeQuery(query, callback)
}

module.exports = { getAllMessagesOfRoom, getMessage }