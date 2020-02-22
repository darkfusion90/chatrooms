const httpStatusCodes = require('../constants/httpStatusCodes')

const isRegisterPath = (path) => {
    return /^\/api\/register(\/){0,1}$/.test(path)
}

const middleware = (req, res, next) => {
    //Prevent multiple redirects if already being redirected
    //Important: DON'T change the order of conditions (i.e., check redirect before req.session.userId)
    //Redirection info needs to be checked before checking req.session.userId otherwise client will be infinitely redirected
    //because /api/user will never be executed and hence req.session.userId is never created
    if (req.session.redirectedFromCookieCreator || req.session.redirectedFromRegister) {
        next()
    }
    else if (!req.session.userId) {
        req.session.redirectedFromCookieCreator = true;
        req.session.redirectedFromRegister = isRegisterPath(req.path)
        res.redirect(httpStatusCodes.PERMANENT_REDIRECT, '/api/user')
    }
    else {
        next()
    }
}

module.exports = middleware