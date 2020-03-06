const RoomMember = require('../models/RoomMember')

exports.createRoomMember = (room, user, memberType, callback) => {
    const promise = new Promise((resolve, reject) => {
        const roomMember = new RoomMember({ room, user, memberType })
        roomMember.save().then(resolve).catch(reject)
    })

    if (callback && typeof (callback) === 'function') {
        promise.then((roomMember) => callback(null, roomMember)).catch((err) => callback(err, null))
    }

    return promise
}

exports.MEMBER_TYPE_ADMIN = 'admin'
exports.MEMBER_TYPE_PARTICIPANT = 'participant'