const { passportAuthenticate } = require('../config/passportConfig')

const debug = (...args) => {
    console.debug('[AuthMiddleware] ', args)
}

const matchesLoginPath = (what) => {
    return /^\/api\/login[\/]{0,1}$/.test(what)
}

const middleware = (req, res, next) => {
    if (matchesLoginPath(req.path) && req.method === 'POST') {
        debug('Will authenticate')
        passportAuthenticate(req, res, next)
    }
    debug('Not authenticating')
    next()
}

module.exports = middleware