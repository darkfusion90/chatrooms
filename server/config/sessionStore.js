const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const oneHour = 3600;
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    autoRemove: 'interval',
    autoRemoveInterval: 0.2
});

module.exports = sessionStore;