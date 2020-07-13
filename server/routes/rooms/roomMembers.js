const {
    createRoomMember,
    getRoomMember,
    getAllMembersOfRoom,
    deleteRoomMember,
    getRoomMemberHavingUserId,
} = require('../../controllers/roomMembers')
const { MEMBER_TYPE_PARTICIPANT } = require('../../constants/memberTypes')
const { genericHandlerCallback } = require('../routeUtils')


const get = (req, res) => {
    const callback = (err, data) => genericHandlerCallback(err, data, res)

    const { roomId, memberId } = req.params

    if (memberId) {
        getRoomMember(memberId, roomId, callback)
    } else {
        getAllMembersOfRoom(roomId, (err, roomMembers) => {
            const responseData = roomMembers ? { 'members': roomMembers } : roomMembers
            callback(err, responseData)
        })
    }
}

const post = (req, res) => {
    const { roomId } = req.params
    const { userId } = req.session

    createRoomMember(
        roomId,
        userId,
        MEMBER_TYPE_PARTICIPANT,
        (err, data) => genericHandlerCallback(err, data, res)
    )
}

const _delete = (req, res) => {
    const { roomId, memberId } = req.params

    deleteRoomMember(memberId, roomId, (err, data) => genericHandlerCallback(err, data, res))
}

const byUserId = (req, res) => {
    const { roomId, userId } = req.params
    const callback = (err, data) => genericHandlerCallback(err, data, res)
    getRoomMemberHavingUserId(roomId, userId, callback)
}

module.exports = { get, post, _delete, byUserId }