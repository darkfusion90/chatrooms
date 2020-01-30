const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.MONGO_URI, config.MONGO_CLIENT_OPTS);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.on('open', function cb(){
    console.log("connected to db")
})