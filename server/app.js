require('dotenv').config();
require('./config/database') //initialize and connect mongoose to mongodb server
const path = require('path')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const session = require('express-session')
const sessionOptions = require('./config/sessionConfig')
const sessionMiddleware = session(sessionOptions)
const cookieCreatorMiddleware = require('./middlewares/cookieCreatorMiddleware')
const ensureAuthenticated = require('./middlewares/ensureAuthenticated')
const errorHandler = require('./middlewares/errorHandler')
require('./socket')(httpServer, sessionMiddleware)
const passport = require('./config/passportConfig')
const routes = require('./routes')

if (process.env.NODE_ENV === 'production') {
    console.log("Production Mode")
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sessionMiddleware)
app.use(cookieCreatorMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', routes.index)
app.post('/api/login', routes.login)
app.post('/api/logout', routes.logout)
app.post('/api/register', routes.register)

app.get(['/api/rooms', '/api/rooms/:id'], routes.rooms.get)
app.post('/api/rooms', routes.rooms.post)
app.patch('/api/rooms/:id', routes.rooms.patch)
app.delete('/api/rooms/:id', routes.rooms._delete)

app.get(['/api/user', '/api/user/:id'], routes.user.get)
app.post('/api/user', routes.user.post)
app.patch('/api/user/:id', ensureAuthenticated, routes.user.patch)
app.delete('/api/user/:id', ensureAuthenticated, routes.user._delete)

app.get('/api/message/:id', routes.message.get)

app.get('/api/user/status/login', routes.user.loginStatus)

app.use(errorHandler)

var serverPort = process.env.PORT || 8000
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
})

app.on('error', (err) => console.log(err))