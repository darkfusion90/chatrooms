function UnauthorizedError(message) {
    this.name = 'UnauthorizedError'
    this.message = message || ''
}

UnauthorizedError.prototype = Object.create(Error.prototype)

module.exports = UnauthorizedError