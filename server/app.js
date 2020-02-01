require('./config/database'); //initialize and connect mongoose to mongodb server
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const path = require('path');
const session = require('express-session');
const sessionOptions = require('./config/sessionConfig');
const sessionMiddleware = session(sessionOptions);
require('./socket')(httpServer, sessionMiddleware);

app.use(sessionMiddleware)


//if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('/*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
//}

var serverPort = process.env.PORT || 8000;
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
});

process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Promise rejection detected");
    console.log("Promise: ", promise, "Reason: ", reason);
})
