const { getInvitation } = require('../../controllers/roomInvitations')
const { createRoomMember } = require('../../controllers/roomMembers')
const { genericHandlerCallback } = require('../routeUtils')
const { MEMBER_TYPE_PARTICIPANT } = require('../../constants/memberTypes')

const post = async (req, res) => {
    const callback = (err, resource) => genericHandlerCallback(err, resource, res)

    const { invitationId } = req.params

    getInvitation(invitationId, (err, invitation) => {
        if (err | !invitation) {
            return callback(err, invitation)
        }

        const { room, invitee } = invitation
        createRoomMember(room._id, invitee._id, MEMBER_TYPE_PARTICIPANT, callback)
    })
}

module.exports = { post }