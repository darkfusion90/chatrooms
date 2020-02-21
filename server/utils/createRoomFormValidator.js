const isEmpty = require('is-empty')

const isValidRoomType = (roomType) => {
    return roomType === 'public' || roomType === 'private' || roomType === 'unlisted'
}

const validate = (data) => {
    const errors = {}
    const { roomName, roomType } = data
    if (!roomName) {
        errors.roomNameEmpty = 'Room name is required'
    }

    if (!roomType) {
        errors.roomTypeEmpty = 'Room type is required'
    } else if (!isValidRoomType(roomType)) {
        errors.invalidRoomType = 'Room type should be either of "private", "public" or "unlisted"'
    }

    return {
        hasErrors: !isEmpty(errors),
        errors: errors
    }
}

module.exports = { validate }