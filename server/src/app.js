require('./config/database'); //initialize and connect mongoose to mongodb server

const app = require('express')();
const httpServer = require('http').createServer(app);
require('./socket')(httpServer);

httpServer.listen(process.env.PORT | 8000);

process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Promise rejection detected");
    console.log("Promise: ", promise, "Reason: ", reason);
})