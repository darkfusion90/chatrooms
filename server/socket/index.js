const socketio = require('socket.io')
const roomEventHandler = require('./eventHandlers/roomEventHandler')
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
        client.on(events.ROOM_EVENT, (...args) => roomEventHandler(io, client, ...args));
    })
}

module.exports = listen