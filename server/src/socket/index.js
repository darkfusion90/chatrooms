const socketio = require('socket.io');
const Room = require('../models/Room');
const roomIdGenerator = require('../roomIdGenerator');
require('./eventHandlers/roomEventsHandler')

/**
 * 
 * @param {Room} room
 * @param {SocketIO.Socket} client 
 * @param {function} callback
 */
function tryJoiningRoom(room, client, callback) {
    switch (room.type) {
        case "public":
            console.log("public")
        case "unlisted":
            console.log("unlisted")
            client.join(room.id, (data) => {
                callback({
                    status: "ok",
                    room: room
                })
            });
            break;
        case "private":
            console.log("private")
            if (room.isOwnedBy(client.id)) {
                console.log("same owner")
                client.join(room.id, (data) => {
                    callback({
                        status: "ok",
                        room: room
                    })
                });
            }
            else {
                console.log("diff owner. will request to " + room.owner)
                io.to(room.owner).emit("ROOM_JOIN_REQUEST", client.id);
                callback({
                    status: "permission_pending",
                    reason: "Private room. Requesting access"
                })
            }
    }
}

function listen(app) {
    const io = socketio.listen(app);

    io.origins('http://localhost:3000')
    io.on('connection', (client) => {
        console.log("CONNECTED")
        const permanentId = client.id;
        client.emit("USER_ID_RECIEVE", permanentId);

        client.on('SEND_MESSAGE', (roomId, message) => {
            io.sockets.in(client.rooms[roomId]).emit("NEW_MESSAGE_RECIEVED", { message: message, senderId: client.id });
        })

        client.on('CREATE_ROOM', (roomName, roomType, roomOwner, callback) => {
            //const room = roomManager.createRoom(roomName, roomType, roomOwner);
            const myRoom = new Room({
                room_id: roomIdGenerator.generate(),
                name: roomName,
                type: roomType,
                owner: roomOwner
            })
            myRoom.save(function (err) {
                console.log('ERROR?')
                console.log(err)
            })
            callback({
                status: "ok",
                room: "yo bro"
            });
        })

        client.on('JOIN_ROOM', (roomId, callback) => {
            const room = roomManager.fetchRoom(roomId);
            console.log("wants to join: ")
            console.log(room);

            if (typeof room === "undefined" || room === null) {
                console.log("REJECTED. Undefined or null room");
                callback({
                    status: "error",
                    reason: "room not found"
                });
            }
            else {
                tryJoiningRoom(room, client, callback);
            }
        })

        client.on("ROOM_JOIN_PERMISSION_SEND", (whoRequested, permissionStatus) => {
            io.to(whoRequested).emit("ROOM_JOIN_PERMISSION_RECIEVE", permissionStatus);
        })
    })
}

module.exports = listen