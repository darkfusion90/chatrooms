const Message = require('../models/Message')
const logger = require('../utils/logger')('[MessagesController] ')

exports.createMessage = (author, roomId, messageTxt, callback) => {
    const promise = new Promise((resolve, reject) => {
        const message = new Message({
            author: author,
            atRoom: roomId,
            data: messageTxt
        })
        message.save().then((message) => {
            logger.debug('Successfully created message: ', message)
            resolve(message)
        }).catch((err) => {
            logger.debug('Error creating message: ', message)
            logger.debug('Error: ', err)
            reject(err)
        })
    })

    if (callback && typeof (callback) === 'function') {
        promise.then((message) => callback(null, message)).catch((err) => callback(err, null))
    }

    return promise
}

exports.getMessage = (messageId, callback) => {
    const promise = new Promise((resolve, reject) => {
        Message.findById(messageId).then(resolve).catch(reject)
    })

    if (callback && typeof (callback) === 'function') {
        promise.then((message) => callback(null, message)).catch((err) => callback(err, null))
    }

    return promise
}

exports.deleteMessage = (messageId, callback) => {
    Message.findByIdAndDelete(messageId, callback)
}