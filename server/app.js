require('dotenv').config();
require('./config/database') //initialize and connect mongoose to mongodb server

const path = require('path')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

const session = require('express-session')
const sessionOptions = require('./config/sessionConfig')
const sessionMiddleware = session(sessionOptions)
const {
    cookieCreatorMiddleware,
    guestUserExpiryRolling,
    errorHandler
} = require('./middlewares')
const passport = require('./config/passportConfig')

require('./socket').listen(httpServer, sessionMiddleware)
const configRoutes = require('./router')

if (process.env.NODE_ENV === 'production') {
    console.log("Production Mode")
    app.use(express.static(path.join(__dirname, '../client/build')))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(sessionMiddleware)
app.use(cookieCreatorMiddleware)
app.use(guestUserExpiryRolling)

app.use(passport.initialize())
app.use(passport.session())

configRoutes(app)
app.use(errorHandler)

const serverPort = process.env.PORT || 8000
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
})

app.on('error', (err) => console.log(err))