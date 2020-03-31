const routes = require('./routes')
const {
    roomAuth,
    ensureAuthenticated
} = require('./middlewares')

/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindRoomRoutes = (app) => {
    const { rooms } = routes

    app.get('/api/rooms/:roomId?', roomAuth.room, rooms.get)
    app.post('/api/rooms', rooms.post)
    app.patch('/api/rooms/:roomId', roomAuth.room, rooms.patch)
    app.delete('/api/rooms/:roomId', roomAuth.room, rooms._delete)

    app.get('/api/rooms/:roomId/messages/:messageId?', rooms.messages.get)
    app.post('/api/rooms/:roomId/messages', rooms.messages.post)
    app.delete('/api/rooms/:roomId/messages/:messageId', rooms.messages._delete)

    app.get('/api/rooms/:roomId/members/:memberId?', roomAuth.roomMembersAuth, rooms.members.get)
    app.post('/api/rooms/:roomId/members/', roomAuth.roomMembersAuth, rooms.members.post)
    app.delete('/api/rooms/:roomId/members/:memberId', roomAuth.roomMembersAuth, rooms.members._delete)
}

/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindUserRoutes = (app) => {
    const { user } = routes

    app.get('/api/user/:userId?', user.get)
    app.post('/api/user', user.post)
    app.patch('/api/user/:userId', ensureAuthenticated, user.patch)
    app.delete('/api/user/:userId', ensureAuthenticated, user._delete)
    app.get('/api/user/status/login', user.loginStatus)
}

/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindRoomInvitationRoutes = (app) => {
    const { roomInvitations } = routes

    app.get('/api/room_invitations/:invitationId?', roomInvitations.get)
    app.post('/api/room_invitations/', roomInvitations.post)
    app.delete('/api/room_invitations/:invitationId', roomInvitations._delete)
}

/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindNotificationRoutes = (app) => {
    const { notifications } = routes
    app.get('/api/notifications/:notificationId', notifications.get)
    app.patch('/api/notifications/:notificationId', notifications.patch)
    app.get('/api/user/:userId/notifications', notifications.get)
}

/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const router = (app) => {
    app.get('/', routes.index)

    bindRoomRoutes(app)
    bindUserRoutes(app)
    bindRoomInvitationRoutes(app)
    bindNotificationRoutes(app)

    app.post('/api/login/', routes.login)
    app.post('/api/logout/', routes.logout)
    app.post('/api/register/', routes.register)

    app.get('*', routes.index)
}

module.exports = router