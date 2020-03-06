const httpStatusCodes = require('../constants/httpStatusCodes')
const addUserToSession = require('../utils/addUserToSession')

const isRegisterPath = (path) => {
    return /^\/api\/register(\/){0,1}$/.test(path)
}

const middleware = (req, res, next) => {
    if (isRegisterPath(req.path) || req.session.redirectedFromRegister) {
        next()
    } else if (!req.session.userId) {
        addUserToSession(req).then(() => next()).catch(err => {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
            console.log('bababababab: ', err)
        })
    }
    else {
        next()
    }
}

module.exports = middleware