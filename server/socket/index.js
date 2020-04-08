const socketio = require('socket.io')
const roomEventHandler = require('./eventHandlers/roomEventHandler')
const messageEventHandler = require('./eventHandlers/messageEventHandler')
const events = require('../constants/socket_event_constants')
const {
    addSocketIdOfUserId,
    getSocketIdListOfUserId,
    removeSocketIdOfUserId
} = require('../controllers/socketIoSessions')

class SocketIoHandler {
    setupSocketIo = (server, sessionMiddleware) => {
        this.io = socketio.listen(server)
        this.io.use((socket, next) => {
            sessionMiddleware(socket.request, socket.request.res, next)
        })

        this.io.on('connection', this.onConnectionHandler)
    }

    onConnectionHandler = async (client) => {
        const { userId } = client.request.session
        addSocketIdOfUserId(userId, client.id)

        client.on(events.ROOM_EVENT, (...args) => roomEventHandler(this.io, client, ...args))
        client.on(events.MESSAGE_EVENT, (...args) => messageEventHandler(this.io, client, ...args))
        client.on('disconnect', () => this.onDisconnectHandler(client))
    }

    onDisconnectHandler = (client) => {
        removeSocketIdOfUserId(client.request.session.userId, client.id)
    }

    notifyUser = async (userId) => {
        const socketList = await getSocketIdListOfUserId(userId)
        socketList.forEach(socketId => {
            console.log('notifying on: ', socketId)
            this.io.to(socketId).emit(events.NOTIFICATION_EVENT, events.NEW_NOTIFICATION)
        })
    }
}

module.exports = new SocketIoHandler()