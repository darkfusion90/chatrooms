const { MEMBER_TYPE_PARTICIPANT } = require('../../controllers/roomMemberController')
const { getRoomMember, getAllRoomMembersOfRoom, addMemberToRoomByRoomId } = require('../../controllers/rooms')
const { genericHandlerCallback } = require('../routeUtils')

const get = (req, res) => {
    const { roomId, memberId } = req.params

    if (memberId) {
        getRoomMember(roomId, memberId, (err, roomMember) => genericHandlerCallback(err, roomMember, res))
    } else {
        getAllRoomMembersOfRoom(roomId, (err, roomMembers) => {
            const responseData = roomMembers ? { 'members': roomMembers } : roomMembers
            genericHandlerCallback(err, responseData, res)
        })
    }
}

const post = (req, res) => {
    const { roomId } = req.params
    const data = {
        userId: req.session.userId,
        memberType: MEMBER_TYPE_PARTICIPANT
    }

    addMemberToRoomByRoomId(roomId, data, (err, room) => {
        const responseData = room ? { members: room.members } : room
        genericHandlerCallback(err, responseData, res)
    })
}

module.exports = { get, post }