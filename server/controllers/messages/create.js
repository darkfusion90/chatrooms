const Message = require('../../models/Message')
const promiseCallbackFunction = require('../../utils/promiseCallbackFunction')


const createMessage = (author, roomId, messageData, callback) => {
    return promiseCallbackFunction((resolve, reject) => {
        const message = new Message({ author, atRoom: roomId, data: messageData })
        message.save().then(resolve).catch(reject)
    }, callback)
}

module.exports = { createMessage }