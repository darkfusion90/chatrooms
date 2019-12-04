const generateRoomId = require('./roomGenerator');

class Room {
    constructor(roomId, roomName, roomType, roomOwner) {
        this.id = roomId;
        this.name = roomName;
        this.type = roomType;
        this.owner = roomOwner;
    }
}

class RoomManager {
    createRoom(roomName, roomType, roomOwner) {
        return new Room(generateRoomId(), roomName, roomType, roomOwner);
    }
}

const instance = new RoomManager();

module.exports = instance;