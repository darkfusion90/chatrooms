const mongoUri = process.env.NODE_ENV === 'production' ?
    process.env.MONGO_DB_PRODUCTION_URI :
    process.env.MONGO_DB_DEVELOPMENT_URI

const thirtyDaysInHours = 30 * 24

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
    GUEST_USER_DB_DOCUMENT_MAX_AGE_MILLISECONDS: 7200000,
    REGISTERED_USER_SESSION_EXPIRES_AT: thirtyDaysInHours,
    MAIN_BRANCH_NAME: 'main'
}
