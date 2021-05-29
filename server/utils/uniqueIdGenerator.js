const randomWords = require('random-words')
const crypto = require('crypto')

function generateIdUsingRandomWords() {
    return randomWords({ exactly: 4, maxLength: 8, join: '-' })
}

function generateHexId(length) {
    if (!length) throw Error('Parameter `length` is required')
    
    return crypto.randomBytes(length).toString('hex')
}

const generateUsername = () => generateHexId(8)

module.exports = { generateIdUsingRandomWords, generateHexId, generateUsername }
