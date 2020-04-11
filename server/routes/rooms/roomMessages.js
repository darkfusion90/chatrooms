const httpStatusCodes = require('../../constants/httpStatusCodes')
const {
    getMessage,
    getAllMessagesOfRoom,
    createMessage,
    deleteMessage
} = require('../../controllers/messages')
const { genericHandlerCallback } = require('../routeUtils')


const get = (req, res) => {
    const callback = (err, data) => genericHandlerCallback(err, data, res)

    const { roomId, messageId } = req.params
    if (messageId) {
        return getMessage(messageId, roomId, callback)
    }
    getAllMessagesOfRoom(roomId, callback)
}

const post = (req, res) => {
    const { roomId } = req.params
    const { userId } = req.session
    const { message } = req.body
    if (!message) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({ 'message': 'Field message is necessary' })
    }

    createMessage(userId, roomId, message, (err, messageDoc) => genericHandlerCallback(err, messageDoc, res))
}

const _delete = (req, res) => {
    const { roomId, messageId } = req.params
    deleteMessage(messageId, roomId, (err, room) => genericHandlerCallback(err, room, res))
}

module.exports = { get, post, _delete }