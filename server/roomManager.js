const generateRoomId = require('./roomGenerator');

class Room {
    constructor(roomId, roomName, roomType, roomOwner) {
        this.id = roomId;
        this.name = roomName;
        this.type = roomType;
        this.owner = roomOwner;
    }

    isOwnedBy(userId){
        return this.owner === userId;
    }
}

class RoomManager {
    //Each roomId (key) will map to the corresponding room (value)
    //Easier to implement search and delete with roomId indexed records rather than iterating over arrays
    rooms = {}

    createRoom(roomName, roomType, roomOwner) {
        const room = new Room(generateRoomId(), roomName, roomType, roomOwner);
        this.rooms[room.id] = room;
        return room;
    }

    fetchRoom(roomId) {
        return this.rooms[roomId];
    }
}

const instance = new RoomManager();

module.exports = instance;