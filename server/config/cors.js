
var whitelist = ['localhost', 'https://the-chatrooms.herokuapp.com']

function isOriginWhitelisted(origin) {
    return whitelist.indexOf(origin) !== -1
}

var corsOptions = {
    origin: function (origin, callback) {
        console.log("Origin: " + origin)
        if (isOriginWhitelisted(origin)) {
            callback(null, true)
        } else {
            callback(() => { console.log("Origin <" + origin + "> not allowed by CORS") })
        }
    },
    credentials: true
}

module.exports = corsOptions