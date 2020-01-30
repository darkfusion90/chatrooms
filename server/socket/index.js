const socketio = require('socket.io')
const Room = require('../models/Room')
const roomIdGenerator = require('../roomIdGenerator')
require('./eventHandlers/roomEventsHandler')

const events = require('./../constants/socket_event_constants')

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
            })
            break
        case "private":
            console.log("private")
            if (room.isOwnedBy(client.id)) {
                console.log("same owner")
                client.join(room.id, (data) => {
                    callback({
                        status: "ok",
                        room: room
                    })
                })
            }
            else {
                console.log("diff owner. will request to " + room.owner)
                io.to(room.owner).emit("ROOM_JOIN_REQUEST", client.id)
                callback({
                    status: "permission_pending",
                    reason: "Private room. Requesting access"
                })
            }
    }
}


function listen(server, sessionMiddleware) {
    const io = socketio.listen(server)
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next)
    })
    io.on('connection', (client) => {
        console.log("NEW? " , client.request.session)
        client.request.session.cow = 123
        client.request.session.save()
        console.log("CONNECTED")
        const permanentId = client.id
        client.emit(events.USER_ID_RECIEVE, "you are a cow")

        client.on(events.SEND_MESSAGE, (roomId, message) => {
            io.sockets.in(client.rooms[roomId]).emit(events.NEW_MESSAGE_RECIEVED, { message: message, senderId: client.id })
        })

        client.on(events.CREATE_ROOM, (roomName, roomType, roomOwner, callback) => {
            console.log(client.handshake.session.haha)
            console.log("wants to create room")
            //const room = roomManager.createRoom(roomName, roomType, roomOwner)
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
            })
        })

        client.on(events.ROOM_JOIN_REQUEST, (roomId, callback) => {
            const room = roomManager.fetchRoom(roomId)
            console.log("wants to join: ")
            console.log(room)

            if (typeof room === "undefined" || room === null) {
                console.log("REJECTED. Undefined or null room")
                callback({
                    status: "error",
                    reason: "room not found"
                })
            }
            else {
                tryJoiningRoom(room, client, callback)
            }
        })

        client.on(events.ROOM_JOIN_PERMISSION_SEND, (whoRequested, permissionStatus) => {
            io.to(whoRequested).emit(events.ROOM_JOIN_PERMISSION_RECIEVE, permissionStatus)
        })
    })
}

module.exports = listen