const randomWordsGenerator = require('random-words');

function createRoomId() {
    return randomWordsGenerator({ exactly: 4, join: '-' })
}

function generateRoom() {
    return createRoomId();
}

module.exports = generateRoom;