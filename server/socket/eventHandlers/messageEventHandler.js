const messagesController = require('../../controllers/messages')
const roomsController = require('../../controllers/rooms')
const httpStatusCodes = require('../../constants/httpStatusCodes')
const events = require('../../constants/socket_event_constants')
const logger = require('../../utils/logger')('[Socket: MessageEventHandler] ')


const handleSendMessage = (io, client, ...args) => {
    const [roomId, messageId] = args
    client.broadcast.to(roomId).emit(events.NEW_MESSAGE, {
        author: client.request.session.userId,
        messageId: messageId
    })
}

const eventHandler = (io, client, subEvent, ...args) => {
    switch (subEvent) {
        case events.SEND_MESSAGE:
            handleSendMessage(io, client, ...args)
    }
}

module.exports = eventHandler