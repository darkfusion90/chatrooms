require('dotenv').config();
require('./config/database') //initialize and connect mongoose to mongodb server
const path = require('path')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const session = require('express-session')
const sessionOptions = require('./config/sessionConfig')
const sessionMiddleware = session(sessionOptions)
require('./socket')(httpServer, sessionMiddleware)
const routes = require('./routes')
const { passport, passportAuthenticate } = require('./config/passportConfig')

if (process.env.NODE_ENV === 'production') {
    console.log("Production Mode")
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', routes.index)
app.get('/login', routes.loginGet)
app.get('/register', routes.registerGet)
app.post('/login', passportAuthenticate, routes.loginPost)
app.post('/register', routes.registerPost)

var serverPort = process.env.PORT || 8000
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
})

