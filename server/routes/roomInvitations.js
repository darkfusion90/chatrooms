const validator = require('validator').default
const isEmpty = require('is-empty')

const {
    BAD_REQUEST,
    RESOURCE_NOT_FOUND
} = require('../constants/httpStatusCodes')
const {
    createInvitation,
    deleteInvitation,
    getInvitationOfInvitee,
    getAllInvitationsOfInvitee
} = require('../controllers/roomInvitations')
const { getRoomByRoomId } = require('../controllers/rooms')
const { genericHandlerCallback } = require('./routeUtils')


exports.get = (req, res) => {
    const {
        userId,
        invitationId
    } = req.params

    if (invitationId) {
        getInvitationOfInvitee(
            invitationId,
            userId,
            (err, invitation) => genericHandlerCallback(err, invitation, res)
        )
    } else {
        console.log('userId: ',userId )
        getAllInvitationsOfInvitee(
            userId,
            (err, invitation) => genericHandlerCallback(err, invitation, res)
        )
    }
}

exports.post = (req, res) => {
    const { hasErrors, errors } = validatePost(req.body)
    if (hasErrors) {
        res.status(BAD_REQUEST).json(errors)
    }

    const { invitee, roomId } = req.body
    const inviter = req.params.userId

    getRoomByRoomId(roomId, (err, room) => {
        if (err) {
            genericHandlerCallback(err, room, res)
        }
        if (!room) {
            res.status(RESOURCE_NOT_FOUND).json({ room: 'Room not found' })
        }
        console.log('room: ', room._id)
        createInvitation(
            invitee,
            inviter,
            room._id,
            (err, invitation) => genericHandlerCallback(err, invitation, res)
        )
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