const socketio = require('socket.io')
const roomEventHandler = require('./eventHandlers/roomEventHandler')
const messageEventHandler = require('./eventHandlers/messageEventHandler')
const events = require('../constants/socket_event_constants')
const {
    addSocketIdOfUserId,
    getSocketIdListOfUserId,
    removeSocketIdOfUserId
} = require('../controllers/socketIoSessions')

function listen(server, sessionMiddleware) {
    const io = socketio.listen(server)
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next)
    })

    io.on('connection', async (client) => {
        const { userId } = client.request.session
        
        console.log("From socket.io, userId: ", userId)
        console.log('socket.io id: ', client.id)
        console.log('SocketIdList: ', await getSocketIdListOfUserId(userId))
        addSocketIdOfUserId(userId, client.id)

        client.on(events.ROOM_EVENT, (...args) => roomEventHandler(io, client, ...args))
        client.on(events.MESSAGE_EVENT, (...args) => messageEventHandler(io, client, ...args))
        client.on('disconnect', async () => {
            const { userId } = client.request.session
            removeSocketIdOfUserId(userId, client.id)
        })
    })
}

module.exports = { listen }