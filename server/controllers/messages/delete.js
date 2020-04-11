const Message = require('../../models/Message')
const { executeQuery } = require('./utils')

const deleteMessage = (messageId, roomId, callback) => {
    const query = Message.findOneAndDelete({ _id: messageId, atRoom: roomId })

    return executeQuery(query, callback)
}


module.exports = { deleteMessage }