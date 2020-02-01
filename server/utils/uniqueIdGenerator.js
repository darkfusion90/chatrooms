const randomWords = require('random-words')

function generate() {
    return randomWords({ exactly: 4, maxLength: 8, join: '-' })
}

module.exports = { generate }