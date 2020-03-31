const mongoose = require('mongoose')
const { RoomInvitationSchema } = require('./RoomInvitation')

const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Schema.Types.String,
        enum: ['pending', 'reviewed'],
        default: 'pending'
    },
    roomInvitation: {
        type: RoomInvitationSchema,
        unique: false
    },
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = { NotificationSchema, Notification }