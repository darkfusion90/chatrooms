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
httpServer.listen(serverPort, "0.0.0.0", () => {
    console.log(`Server listening on port ${serverPort}`)
})