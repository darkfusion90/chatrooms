const Message = require('../models/Message')
const uniqueIdGenerator = require('../utils/uniqueIdGenerator')
const logger = require('../utils/logger')('[MessagesController] ')

exports.createMessage = (author, roomId, messageTxt, callback) => {
    const messageId = uniqueIdGenerator.generateIdUsingCrypto()
    const message = new Message({
        id: messageId,
        author: author,
        atRoom: roomId,
        data: messageTxt
    })
    message.save(function (err) {
        if (err) {
            logger.debug('Error creating message: ', message)
            logger.debug('Error: ', err)
            callback(err, null)
        }
        else {
            logger.debug('Successfully created message: ', message)
            callback(null, message)
        }
    })
}

exports.getMessage = (messageId, callback) => {
    Message.findOne({ id: messageId }, callback)
}