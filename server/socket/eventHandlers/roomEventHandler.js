const events = require('../../constants/socket_event_constants');
const roomsController = require('../../controllers/rooms');
const uniqueIdGenerator = require('../../utils/uniqueIdGenerator');

function eventHandler(io, client, subEvent, ...args) {
    console.log("Room Event fired by: " + client.id)
    console.log("SubEvent: " + subEvent)
    console.log("Other args: ", args)
    switch (subEvent) {
        case events.CREATE_ROOM:
            const [roomName, roomType, roomOwner, clientCallback] = args;
            console.log(roomName, roomType, roomOwner, clientCallback)
            const roomId = uniqueIdGenerator.generate();
            roomsController.createRoom(roomId, roomName, roomType, roomOwner, clientCallback);
            break;
        default:
            console.log(args)
    }
}

module.exports = eventHandler;