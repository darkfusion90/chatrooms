const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const RoomInvitationSchema = new Schema({
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    inviter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    room: {
        type: Schema.Types.String,
        ref: 'Room',
        required: true
    }
})

const RoomInvitation = mongoose.model('RoomInvitation', RoomInvitationSchema)

module.exports = { RoomInvitationSchema, RoomInvitation }