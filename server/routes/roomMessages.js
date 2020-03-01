const httpStatusCodes = require('../constants/httpStatusCodes')
const { getRoomMessage, getAllMessagesInRoom, addMessageToRoom } = require('../controllers/rooms')
const { genericHandlerCallback } = require('./routeUtils')


const get = (req, res) => {
    const { roomId, messageId } = req.params
    if (messageId) {
        return getRoomMessage(roomId, messageId, (err, message) => genericHandlerCallback(err, message, res))
    }
    getAllMessagesInRoom(roomId, (err, messages) => {
        if (messages) {
            messages = { messages: messages }
        }
        genericHandlerCallback(err, messages, res)
    })
}

const post = (req, res) => {
    const { roomId } = req.params
    const { userId } = req.session
    const { message } = req.body
    if (!message) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({ 'message': 'Field message is necessary' })
    }
    addMessageToRoom(roomId, userId, message, (err, messageDoc) => genericHandlerCallback(err, messageDoc, res))
}

module.exports = { get, post }