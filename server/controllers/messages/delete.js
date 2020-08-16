const Message = require('../../models/Message')
const { executeQuery } = require('./utils')

const deleteMessage = (messageId, callback) => {
    const query = Message.findByIdAndDelete(messageId)

    return executeQuery(query, callback)
}


module.exports = { deleteMessage }