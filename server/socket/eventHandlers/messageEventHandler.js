const messagesController = require('../../controllers/messages')
const roomsController = require('../../controllers/rooms')
const httpStatusCodes = require('../../constants/httpStatusCodes')
const events = require('../../constants/socket_event_constants')
const logger = require('../../utils/logger')('[Socket: MessageEventHandler] ')


const handleSendMessage = (io, client, ...args) => {
    const userId = client.request.session.userId
    const roomId = args[0], message = args[1], clientCallback = args[2]
    logger.debug('roomId: ' + roomId)
    logger.debug('message: ' + message)
    messagesController.createMessage(userId, roomId, message, (err, messageDoc) => {
        if (err) {
            clientCallback({ status: httpStatusCodes.INTERNAL_SERVER_ERROR })
        }
        else {
            roomsController.addNewMessage(roomId, userId, messageDoc.id, (err, updatedRoom) => {
                if (err) {
                    clientCallback({ status: httpStatusCodes.INTERNAL_SERVER_ERROR })
                }
                else {
                    clientCallback({ status: httpStatusCodes.OK, data: updatedRoom })
                }
            })
        }
    })
}

const eventHandler = (io, client, subEvent, ...args) => {
    const userId = client.request.session.userId
    logger.debug("Message Event fired by: " + userId)
    logger.debug("SubEvent: " + subEvent)
    logger.debug("Other args: ", args)
    const [roomId, message, clientCallback] = args
    logger.debug('unpack roomId: ', roomId)
    logger.debug('unpack message: ', message)
    logger.debug('unpack clientCallback: ', clientCallback)

    switch (subEvent) {
        case events.SEND_MESSAGE:
            handleSendMessage(io, client, ...args)
    }
}

module.exports = eventHandler