const { passportAuthenticate } = require('../config/passportConfig')
const logger = require('../utils/logger')('[AuthMiddleware] ')


const matchesLoginPath = (what) => {
    return /^\/api\/login[\/]{0,1}$/.test(what)
}

const middleware = (req, res, next) => {
    if (matchesLoginPath(req.path) && req.method === 'POST') {
        logger.debug('Will authenticate')
        passportAuthenticate(req, res, next)
    }
    else {
        logger.debug('Not authenticating')
        next()
    }
}

module.exports = middleware