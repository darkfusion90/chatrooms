const config = require('./config');
const mongoose = require('mongoose');

//Solution to -> "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
console.log("Mongodb Connection URI: ", config.MONGO_URI)
mongoose.connect(config.MONGO_URI, config.MONGO_CLIENT_OPTS);
mongoose.connection.on('open', function cb() {
    console.log("connected to db")
})
mongoose.connection.on('error', function cb(err) {
    console.log("Error connecting to db: ", err)
})