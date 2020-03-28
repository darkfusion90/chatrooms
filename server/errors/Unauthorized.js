function UnauthorizedError(reason) {
    this.name = 'UnauthorizedError'
    this.reason = reason || ''
}

UnauthorizedError.prototype = Object.create(Error.prototype)

module.exports = UnauthorizedError