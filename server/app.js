require('./config/database'); //initialize and connect mongoose to mongodb server
const app = require('express')();
const httpServer = require('http').createServer(app);
const session = require('express-session');
const cors = require('cors');
const corsOptions = require('./config/cors');
const sessionOptions = require('./config/sessionConfig');
const sessionMiddleware = session(sessionOptions);
require('./socket')(httpServer, sessionMiddleware);

app.use(cors())
app.use(sessionMiddleware)

app.get('/', function(req, res){
    console.log("Http Get /")
    console.log(req.session)
    if(!req.session.httpcow){
        res.send("You seem unfamilar!")
        req.session.httpcow = 123
        req.session.save()
    }
    else{
        res.send("I know you! Cow = "+req.session.httpcow)
    }
})
app.get('/ping', function(req, res){
    console.log("Http Get /")
    console.log(req.session)
    if(!req.session.httpcow){
        res.send("ping unfamilar!")
        req.session.httpcow = 123
        req.session.save()
    }
    else{
        res.send("ping familiar! Cow = "+req.session.httpcow)
    }
})

var serverPort = process.env.PORT || 8000;
httpServer.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server listening on port ${serverPort}`)
});

process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Promise rejection detected");
    console.log("Promise: ", promise, "Reason: ", reason);
})