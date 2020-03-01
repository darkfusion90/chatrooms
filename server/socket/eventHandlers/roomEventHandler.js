const events = require('../../constants/socket_event_constants')
const roomsController = require('../../controllers/rooms')

function handleConnectToRoom(io, client, args) {
    const [roomId, clientCallback] = args
    console.log('client callback: ', args)
    client.join(roomId, clientCallback)
    client.broadcast.to(roomId).emit(events.NEW_USER_IN_ROOM, {
        userId: client.request.session.userId
    })
}

function eventHandler(io, client, subEvent, ...args) {
    console.log("Room Event fired by: " + client.id)
    console.log("SubEvent: " + subEvent)
    console.log("Other args: ", args)
    switch (subEvent) {
        case events.CONNECT_TO_ROOM:
            handleConnectToRoom(io, client, args)
        default:
            console.log(args)
    }
}

module.exports = eventHandler