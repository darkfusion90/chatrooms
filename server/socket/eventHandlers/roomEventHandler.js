const events = require('../../constants/socket_event_constants')
const roomsController = require('../../controllers/rooms')
const uniqueIdGenerator = require('../../utils/uniqueIdGenerator')

function handleCreateRoom(client, args) {
    const [roomName, roomType, clientCallback] = args
    const roomOwner = client.request.session.userId
    console.log(roomName, roomType, roomOwner, clientCallback)
    const roomId = uniqueIdGenerator.generateIdUsingRandomWords()
    roomsController.createRoom(roomId, roomName, roomType, roomOwner, clientCallback)
}

function eventHandler(io, client, subEvent, ...args) {
    console.log("Room Event fired by: " + client.id)
    console.log("SubEvent: " + subEvent)
    console.log("Other args: ", args)
    switch (subEvent) {
        case events.CREATE_ROOM:
            handleCreateRoom(client, args)
            break;
        case events.JOIN_ROOM:
            const [roomId, clientCallback] = args
            console.log(roomId, clientCallback)
        //TODO: Join Room
        default:
            console.log(args)
    }
}

module.exports = eventHandler