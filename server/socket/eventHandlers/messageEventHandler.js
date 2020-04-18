const events = require('../../constants/socket_event_constants')

const handleSendMessage = (io, client, ...args) => {
    console.log("new message args: ", args)
    const [roomId] = args
    console.log("new message to: ", roomId)
    client.to(roomId).emit(events.MESSAGE_EVENT, events.NEW_MESSAGE, {
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