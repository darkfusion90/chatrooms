function MongooseDuplicateKeyError(model='', message='', duplicates={}) {
    this.name = 'MongooseDuplicateKeyError'
    this.model = model
    this.message = message
    this.duplicates = duplicates
}

MongooseDuplicateKeyError.prototype = Object.create(Error.prototype)

module.exports = MongooseDuplicateKeyError