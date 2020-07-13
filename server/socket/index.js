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
            sessionMiddleware(socket.request, socket.request.res || {}, next)
        })

        this.io.on('connection', this.onConnectionHandler)
    }

    onConnectionHandler = async (client) => {
        const { userId } = client.request.session
        if (userId != null) addSocketIdOfUserId(userId, client.id)

        client.on(events.CLIENT_EVENT_FLUTTER, (userId, event, ...args) => {
            client.request.session.userId = userId
            client.request.session.save()
            this.handlerMapping(event)(client)(...args)
        })

        client.on(events.ROOM_EVENT, this.onRoomEventHandler(client))
        client.on(events.MESSAGE_EVENT, this.onMessageEventHandler(client))

        client.on('disconnect', () => this.onDisconnectHandler(client))
    }

    onDisconnectHandler = (client) => {
        removeSocketIdOfUserId(client.request.session.userId, client.id)
    }

    handlerMapping = (event) => {
        switch (event) {
            case events.ROOM_EVENT:
                return this.onRoomEventHandler
            case events.MESSAGE_EVENT:
                return this.onMessageEventHandler
            default:
                return () => console.log('Manual event handler. Event unidentified: ', event)
        }
    }

    onRoomEventHandler = (client) => (...args) => roomEventHandler(this.io, client, ...args)

    onMessageEventHandler = (client) => (...args) => messageEventHandler(this.io, client, ...args)

    notifyUser = async (userId) => {
        const socketList = await getSocketIdListOfUserId(userId)
        socketList.forEach(socketId => {
            console.log('notifying on: ', socketId)
            this.io.to(socketId).emit(events.NOTIFICATION_EVENT, events.NEW_NOTIFICATION)
        })
    }
}

module.exports = new SocketIoHandler()

