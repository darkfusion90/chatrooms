const messagesController = require('../../controllers/messages')
const roomsController = require('../../controllers/rooms')
const httpStatusCodes = require('../../constants/httpStatusCodes')
const events = require('../../constants/socket_event_constants')
const logger = require('../../utils/logger')('[Socket: MessageEventHandler] ')


const handleSendMessage = (io, client, ...args) => {
    console.log("new message args: ", args)
    const [roomId] = args
    console.log("new message to: ", roomId)
    client.broadcast.to(roomId).emit(events.MESSAGE_EVENT, events.NEW_MESSAGE, {
        roomId: roomId,
        author: client.request.session.userId
    })
}

const eventHandler = (io, client, subEvent, ...args) => {
    switch (subEvent) {
        case events.NEW_MESSAGE:
            handleSendMessage(io, client, ...args)
    }
}

module.exports = eventHandler