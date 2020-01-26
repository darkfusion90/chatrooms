require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

const isProductionMode = process.env.NODE_ENV === 'production'

if (isProductionMode) {
    app.use(express.static(path.join(__dirname, '../build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'))
    })
}
else{
    app.get('/*', (req, res) => {
        res.send("blah")
        console.log("Developement server enabled")
    })
}

const serverPort = process.env.PORT || 3000
const serverHost = isProductionMode ? "https://the-chatrooms.herokuapp.com/" : "localhost"
httpServer.listen(serverPort, serverHost, () => {
    console.log(`Server up on ${serverHost} listening on port ${serverPort}`)
})

