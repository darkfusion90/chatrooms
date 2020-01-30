const sessionStore = require('./sessionStore');

oneday = 24 * 60 * 60

const sessionOptions = {
    secret: 'drax is so subtle with movements, he is almost invisible!',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: oneday,
        secure: false
    }
}

module.exports = sessionOptions