const validator = require('validator').default
const isEmpty = require('is-empty')

const convertEmptyFieldsToEmptyStrings = (data) => {
    data.roomName = isEmpty(data.roomName) ? '' : data.roomName
    data.roomType = isEmpty(data.roomType) ? '' : data.roomType
}

module.exports = (data) => {
    convertEmptyFieldsToEmptyStrings(data)
    const { roomName, roomType } = data
    const errors = {}

    if (validator.isEmpty(roomName)) {
errors.roomNameEmpty = 
    }
    if (validator.isEmpty(roomType)) {

    }
}