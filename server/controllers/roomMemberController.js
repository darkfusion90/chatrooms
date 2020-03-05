const RoomMember = require('../models/RoomMember')

const _createRoomMember = (user, memberType, onFulfilled, onRejected) => {
    const roomMember = new RoomMember({ user, memberType })
    roomMember.save().then(onFulfilled).catch(onRejected)
}

exports.createRoomMember = (user, memberType, callback) => {
    if (callback) {
        _createRoomMember(user, memberType, roomMember => callback(null, roomMember), err => callback(err, null))
    }
    else {
        return new Promise((resolve, reject) => {
            _createRoomMember(user, memberType, resolve, reject)
        })
    }
}

exports.MEMBER_TYPE_ADMIN = 'admin'
exports.MEMBER_TYPE_PARTICIPANT = 'participant'