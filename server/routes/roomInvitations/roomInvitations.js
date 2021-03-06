const validator = require('validator').default
const isEmpty = require('is-empty')

const {
    BAD_REQUEST,
    RESOURCE_NOT_FOUND
} = require('../../constants/httpStatusCodes')
const {
    createInvitation,
    deleteInvitation,
    getInvitation,
    getAllInvitationsOfUser
} = require('../../controllers/roomInvitations')
const { createNotification } = require('../../controllers/notifications')
const { getRoom } = require('../../controllers/rooms')
const { genericHandlerCallback } = require('../routeUtils')


exports.get = (req, res) => {
    const callback = (err, invitation) => genericHandlerCallback(err, invitation, res)

    const { invitationId } = req.params
    if (invitationId) {
        getInvitation(invitationId, callback)
    } else {
        getAllInvitationsOfUser(req.session.userId, callback)
    }
}

exports.post = (req, res) => {
    const { hasErrors, errors } = validatePost(req.body)
    if (hasErrors) {
        return res.status(BAD_REQUEST).json(errors)
    }

    const { invitee, roomId } = req.body
    const inviter = req.session.userId

    getRoom(roomId, (err, room) => {
        if (err) {
            return genericHandlerCallback(err, room, res)
        }
        if (!room) {
            return res.status(RESOURCE_NOT_FOUND).json({ room: 'Room not found' })
        }

        createInvitation(invitee, inviter, room._id, (err, invitation) => {
            if (err || !invitation) return genericHandlerCallback(err, invitation, res)

            createNotification(invitee, {
                type: 'room_invitation',
                payload: invitation
            }, (err, _) => genericHandlerCallback(err, invitation, res))
        })
    })
}

const validatePost = (data) => {
    const errors = {}
    data.roomId = isEmpty(data.roomId) ? '' : data.roomId
    data.invitee = isEmpty(data.invitee) ? '' : data.invitee

    if (validator.isEmpty(data.roomId)) {
        errors.roomId = 'Room Id is required'
    }

    if (validator.isEmpty(data.invitee)) {
        errors.invitee = 'Invitee is required'
    }

    return {
        hasErrors: !isEmpty(errors),
        errors
    }
}

exports._delete = (req, res) => {
    deleteInvitation(req.params.invitationId, (err, invitation) => {
        genericHandlerCallback(err, invitation, res)
    })
}