const config = require('../config/config')

module.exports = (sessionExpires) => {
    sessionExpires = new Date(sessionExpires)
    const updatedValueHours = sessionExpires.getHours() + config.REGISTERED_USER_SESSION_EXPIRES_AT
    return new Date(sessionExpires.setHours(updatedValueHours))
}