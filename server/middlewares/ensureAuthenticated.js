const UnauthorizedError = require('../errors/Unauthorized')

module.exports = (req, _, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        next(new UnauthorizedError())
    }
}
