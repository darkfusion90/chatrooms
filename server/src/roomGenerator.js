const randomWordsGenerator = require('random-words');

function createRoomId() {
    return randomWordsGenerator({ exactly: 4, join: '-' })
}

function generateRoomId() {
    return createRoomId();
}

module.exports = generateRoomId;