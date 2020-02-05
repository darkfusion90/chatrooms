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

const usersController = require('./controllers/users')

const isProductionMode = process.env.NODE_ENV === 'production'
if (isProductionMode) {
    console.log("Production Mode")
    app.use(express.static(path.join(__dirname, '../client/build')))
}
else {
    //Prevents caching
    app.disable('etag');
}

app.use(sessionMiddleware)
app.use((_, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache'
    })
    next();
})

app.get('/*', (req, res) => {
    console.log('GET /')
    console.log('SessionId: ' + req.sessionID)
    if (!req.session.userId) {
        usersController.createUnregisteredUser(req.session.cookie.expires, (err, user) => {
            if (err) {
                console.log("Error creating user:\n", err)
            }
            else {
                console.log("Callback: ", user)
                req.session.userId = user.userId
                req.session.save()
            }
        })
    }
    else {
        console.log('Old User. UserId: ' + req.session.userId)
    }

    if (isProductionMode) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    } else {
        res.send('Hello from Development Server!')
    }
})

var serverPort = process.env.PORT || 8000
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
})

