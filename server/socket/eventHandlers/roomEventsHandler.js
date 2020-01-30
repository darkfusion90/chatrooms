const events = require('../../constants/socket_event_constants');

function eventsHandler(client) {
    client.on(events.CREATE_ROOM, (roomName, roomType, roomOwner, callback) => {
        
    });
}

module.exports = eventsHandler;