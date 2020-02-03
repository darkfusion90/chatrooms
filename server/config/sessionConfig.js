const sessionStore = require('./sessionStore');

oneHour = 3600000

const sessionOptions = {
    secret: 'drax is so subtle with movements, he is almost invisible!',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: sessionStore,
    cookie: {
        maxAge: oneHour,
        secure: false,
        httpOnly: false
    }
}

module.exports = sessionOptions