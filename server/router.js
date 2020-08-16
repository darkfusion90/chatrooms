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
    const { rooms, branches } = routes

    app.get('/api/rooms/:roomId?', roomAuth.room, rooms.get)
    app.post('/api/rooms', rooms.post)
    app.patch('/api/rooms/:roomId', roomAuth.room, rooms.patch)
    app.delete('/api/rooms/:roomId', roomAuth.room, rooms._delete)

    app.get('/api/rooms/:roomId/branch/main', branches.getMain)
    app.get('/api/rooms/:roomId/branch/:branchId?', branches.get)
    app.post('/api/rooms/:roomId/branch/', branches.post)

    app.get('/api/rooms/:roomId/messages/:messageId?', rooms.messages.get)
    app.get('/api/rooms/:roomId/branch/:branchId/messages/:messageId?', rooms.messages.get)
    app.post('/api/rooms/:roomId/messages', rooms.messages.post)
    app.post('/api/rooms/:roomId/branch/:branchId/messages/', rooms.messages.post)
    app.delete('/api/messages/:messageId', rooms.messages._delete)

    app.get('/api/rooms/:roomId/members/:memberId?', roomAuth.roomMembersAuth, rooms.members.get)
    app.post('/api/rooms/:roomId/members/', roomAuth.roomMembersAuth, rooms.members.post)
    app.delete('/api/rooms/:roomId/members/:memberId', roomAuth.roomMembersAuth, rooms.members._delete)

    app.get('/api/rooms/:roomId/members/byuid/:userId', rooms.members.byUserId)
}


/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindUserRoutes = (app) => {
    const { user } = routes

    app.get('/api/user/:userId?/rooms', user.joinedRooms)
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

    app.post('/api/room_invitations/:invitationId/accept', roomInvitations.accept.post)
}


/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindRoomJoinRequestRoutes = (app) => {
    const { roomJoinRequests } = routes
    app.get('/api/rooms/:roomId/join_requests/:requestId?', roomJoinRequests.get.byRoom)
    app.get('/api/join_requests/:requestId?', roomJoinRequests.get.byUser)
    app.post('/api/rooms/:roomId/join_requests/', roomJoinRequests.post)
}


/**
 * 
 * @param {Express} app The express application to bind all the routes to
 */
const bindNotificationRoutes = (app) => {
    const { notifications } = routes

    app.get('/api/notifications/:notificationId?', notifications.get)
    app.patch('/api/notifications/:notificationId', notifications.patch)
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
    bindRoomJoinRequestRoutes(app)
    bindNotificationRoutes(app)

    app.post('/api/login/', routes.login)
    app.post('/api/logout/', routes.logout)
    app.post('/api/register/', routes.register)

    app.get('/api/search', routes.search.get)

    app.get('/api/count/:resource', routes.count.get)

    app.get('*', routes.index)
}

module.exports = router
