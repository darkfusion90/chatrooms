const randomWordsGenerator = require('random-words');

function createRoomId() {
    return randomWordsGenerator({ exactly: 4, join: '-' })
}

module.exports = {
    generate: createRoomId
}