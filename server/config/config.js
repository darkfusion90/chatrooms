const mongoUri = process.env.NODE_ENV === 'production' ?
    process.env.MONGO_DB_PRODUCTION_URI :
    process.env.MONGO_DB_DEVELOPMENT_URI

module.exports = {
    MONGO_URI: encodeURI(mongoUri),
    MONGO_CLIENT_OPTS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000,
        socketTimeoutMS: 50000,
        keepAlive: true
    },
    COOKIE_MAX_AGE_IN_MILLISECONDS: 3600000,
    GUEST_USER_DB_DOCUMENT_MAX_AGE_MILLISECONDS: 7200000
}
