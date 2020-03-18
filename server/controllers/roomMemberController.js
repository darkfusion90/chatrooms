const RoomMember = require('../models/RoomMember')

exports.createRoomMember = (roomId, userId, memberType, callback) => {
    const promise = new Promise((resolve, reject) => {
        const roomMember = new RoomMember({ room: roomId, user: userId, memberType })
        roomMember.save().then(resolve).catch(reject)
    })

    if (callback && typeof (callback) === 'function') {
        promise.then((roomMember) => callback(null, roomMember)).catch((err) => callback(err, null))
    }

    return promise
}

exports.deleteRoomMember = (memberId, callback) => {
    RoomMember.findByIdAndDelete(memberId, callback)
}


exports.MEMBER_TYPE_ADMIN = 'admin'
exports.MEMBER_TYPE_PARTICIPANT = 'participant'