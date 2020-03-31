const mongoose = require('mongoose')
const { RoomJoinRequestSchema } = require('./RoomJoinRequest')

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
    roomJoinRequest: RoomJoinRequestSchema,
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = { NotificationSchema, Notification }