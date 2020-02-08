const socketio = require('socket.io')
const roomEventHandler = require('./eventHandlers/roomEventHandler')
const events = require('./../constants/socket_event_constants')

function listen(server, sessionMiddleware) {
    const io = socketio.listen(server)
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next)
    })
    io.on('connection', (client) => {
        console.log("FROM SOCKET.IO, UserId: ", client.request.session.userId)
        client.on(events.ROOM_EVENT, (...args) => roomEventHandler(io, client, ...args));
    })
}

module.exports = listen