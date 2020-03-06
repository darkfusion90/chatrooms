const RoomMember = require('../models/RoomMember')

const _createRoomMember = (room, user, memberType, onFulfilled, onRejected) => {
    const roomMember = new RoomMember({ room, user, memberType })
    roomMember.save().then(onFulfilled).catch(onRejected)
}

exports.createRoomMember = (roomObjectId, userId, memberType, callback) => {
    if (callback) {
        _createRoomMember(roomObjectId, userId, memberType, roomMember => callback(null, roomMember), err => callback(err, null))
    }
    else {
        return new Promise((resolve, reject) => {
            _createRoomMember(roomObjectId, userId, memberType, resolve, reject)
        })
    }
}

exports.MEMBER_TYPE_ADMIN = 'admin'
exports.MEMBER_TYPE_PARTICIPANT = 'participant'