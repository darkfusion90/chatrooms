const events = require('../../constants/socket_event_constants')
const roomsController = require('../../controllers/rooms')

function handleConnectToRoom(io, client, args) {
    const [roomId, clientCallback] = args
    console.log('connect to room id ', roomId)
    client.join(roomId, clientCallback)
    client.broadcast.to(roomId).emit(events.ROOM_EVENT, events.NEW_USER_IN_ROOM, {
        userId: client.request.session.userId,
        roomId: roomId
    })
}

function eventHandler(io, client, subEvent, ...args) {
    switch (subEvent) {
        case events.CONNECT_TO_ROOM:
            return handleConnectToRoom(io, client, args)
        default:
            console.log(args)
    }
}

module.exports = eventHandler