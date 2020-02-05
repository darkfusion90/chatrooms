const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGO_DB_USER_PW = process.env.MONGO_DB_USER_PW;

module.exports = {
    MONGO_URI: encodeURI(`mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_USER_PW}@cluster0-bestn.mongodb.net/test?retryWrites=true&w=majority`),
    MONGO_CLIENT_OPTS: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}
