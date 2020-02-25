const socketio = require('socket.io')
const roomEventHandler = require('./eventHandlers/roomEventHandler')
const events = require('../constants/socket_event_constants')
const httpStatusCodes = require('../constants/httpStatusCodes')
const { getUserByUsername } = require('../controllers/users')

function listen(server, sessionMiddleware) {
    const io = socketio.listen(server)
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next)
    })
    io.on('connection', (client) => {
        console.log("FROM SOCKET.IO, UserId: ", client.request.session.userId)
        client.on(events.ROOM_EVENT, (...args) => roomEventHandler(io, client, ...args));
        client.on(events.USER_EVENT, (subEvent, data, callback) => {
            console.log('event: ', subEvent, '\n', data)
            switch (subEvent) {
                case events.CHECK_USERNAME:
                    getUserByUsername(data, false, (err, user) => {
                        if (err) {
                            console.log(err)
                            callback({ status: httpStatusCodes.INTERNAL_SERVER_ERROR, })
                        }
                        else if (!user) {
                            callback({ status: httpStatusCodes.RESOURCE_NOT_FOUND })
                        }
                        else {
                            callback({ status: httpStatusCodes.OK, data: user })
                        }
                    })
            }
        })
    })
}

module.exports = listen