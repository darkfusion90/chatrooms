const { addMemberToRoomByRoomId } = require('../../controllers/rooms')
const { getInvitation } = require('../../controllers/roomInvitations')
const { MEMBER_TYPE_PARTICIPANT } = require('../../controllers/roomMemberController')
const { genericHandlerCallback } = require('../routeUtils')

const post = async (req, res) => {
    const { invitationId } = req.params

    getInvitation(invitationId, (err, invitation) => {
        if (err | !invitation) {
            return genericHandlerCallback(err, invitation, res)
        }

        const { room, invitee } = invitation
        const memberData = {
            userId: invitee._id,
            memberType: MEMBER_TYPE_PARTICIPANT
        }
        addMemberToRoomByRoomId(room.roomId, memberData, (err, joinedRoom) => {
            genericHandlerCallback(err, joinedRoom, res)
        })
    })
}

module.exports = { post }