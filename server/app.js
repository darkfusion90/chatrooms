require('dotenv').config();
require('./config/database') //initialize and connect mongoose to mongodb server

const path = require('path')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

const session = require('express-session')
const sessionOptions = require('./config/sessionConfig')

//middlewares
const sessionMiddleware = session(sessionOptions)
const cookieCreatorMiddleware = require('./middlewares/cookieCreatorMiddleware')
const guestUserExpiryRollingMiddleware = require('./middlewares/guestUserExpiryRolling')
const ensureAuthenticated = require('./middlewares/ensureAuthenticated')
const roomAuth = require('./middlewares/roomAuth')
const errorHandler = require('./middlewares/errorHandler')
const passport = require('./config/passportConfig')

require('./socket')(httpServer, sessionMiddleware)
const routes = require('./routes')

if (process.env.NODE_ENV === 'production') {
    console.log("Production Mode")
    app.use(express.static(path.join(__dirname, '../client/build')))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sessionMiddleware)
app.use(cookieCreatorMiddleware)
app.use(guestUserExpiryRollingMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', routes.index)
app.all('/api/test/rooms/:roomId', roomAuth.room, (req, res) => {
    res.send('Hello, bro! :)')
})

app.post('/api/login/', routes.login)
app.post('/api/logout/', routes.logout)
app.post('/api/register/', routes.register)

app.get('/api/rooms/:roomId?', roomAuth.room, routes.rooms.get)
app.post('/api/rooms', routes.rooms.post)
app.patch('/api/rooms/:roomId', roomAuth.room, routes.rooms.patch)
app.delete('/api/rooms/:roomId', roomAuth.room, routes.rooms._delete)

app.get('/api/rooms/:roomId/messages/:messageId?', routes.rooms.messages.get)
app.post('/api/rooms/:roomId/messages', routes.rooms.messages.post)
app.delete('/api/rooms/:roomId/messages/:messageId', routes.rooms.messages._delete)

app.get('/api/rooms/:roomId/members/:memberId?', roomAuth.roomMembersAuth, routes.rooms.members.get)
app.post('/api/rooms/:roomId/members/', roomAuth.roomMembersAuth, routes.rooms.members.post)

app.get('/api/user/:userId?', routes.user.get)
app.post('/api/user', routes.user.post)
app.patch('/api/user/:userId', ensureAuthenticated, routes.user.patch)
app.delete('/api/user/:userId', ensureAuthenticated, routes.user._delete)

app.get('/api/user/status/login', routes.user.loginStatus)

app.get('*', routes.index)

app.use(errorHandler)

var serverPort = process.env.PORT || 8000
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
})

app.on('error', (err) => console.log(err))