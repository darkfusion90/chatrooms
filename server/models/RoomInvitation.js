const mongoose = require('mongoose')
const { UserSchema } = require('./User')
const { RoomSchema } = require('./Room')

const RoomInvitationSchema = new mongoose.Schema({
    invitee: {
        type: UserSchema,
        required: true,
    },
    inviter: {
        type: UserSchema,
        required: true,
    },
    room: {
        type: RoomSchema,
        required: true
    }
})

const RoomInvitation = mongoose.model('RoomInvitation', RoomInvitationSchema)

module.exports = RoomInvitation