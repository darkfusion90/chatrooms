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
const authMiddleware = require('./middlewares/authMiddleware')
require('./socket')(httpServer, sessionMiddleware)
const { passport } = require('./config/passportConfig')
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
app.all('/api*', authMiddleware, routes.apiRouter)
app.all('*', (_, res) => {
    res.status(404).send("Page Not Found")
})

var serverPort = process.env.PORT || 8000
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
})

