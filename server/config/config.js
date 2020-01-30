const MONGO_USER_PW = "xPl09x0GtdoqzaS0";

module.exports = {
    MONGO_URI: `mongodb+srv://darkfusion90:${MONGO_USER_PW}@cluster0-bestn.mongodb.net/test?retryWrites=true&w=majority`,
    MONGO_CLIENT_OPTS: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}