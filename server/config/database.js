const config = require('./config');
const mongoose = require('mongoose');

//Solution to -> "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGO_URI, config.MONGO_CLIENT_OPTS);
mongoose.connection.on('open', function cb() {
    console.log("connected to db")
})