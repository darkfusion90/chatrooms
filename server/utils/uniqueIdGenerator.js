const randomWords = require('random-words')
const crypto = require('crypto')

function generateIdUsingRandomWords() {
    return randomWords({ exactly: 4, maxLength: 8, join: '-' })
}

function generateIdUsingCrypto() {
    return crypto.randomBytes(16).toString('hex')
}

module.exports = { generateIdUsingRandomWords, generateIdUsingCrypto }