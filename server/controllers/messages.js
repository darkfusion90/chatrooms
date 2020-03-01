const Message = require('../models/Message')
const logger = require('../utils/logger')('[MessagesController] ')

exports.createMessage = (author, roomId, messageTxt, callback) => {
    const message = new Message({
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
    if (callback) {
        Message.findById(messageId, callback)
    }
    else {
        return new Promise((resolve, reject) => {
            Message.findById(messageId, (err, message) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(message)
                }
            })
        })
    }
}