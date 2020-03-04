const { createUnregisteredUser } = require('../controllers/users')
const addUserToSession = require('../utils/addUserToSession')

const isRegisterPath = (path) => {
    return /^\/api\/register(\/){0,1}$/.test(path)
}

const middleware = (req, res, next) => {
    if (isRegisterPath(req.path) || req.session.redirectedFromRegister) {
        next()
    } else if (!req.session.userId) {
        if (addUserToSession(req)) next()
        else return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
    else {
        next()
    }
}

module.exports = middleware