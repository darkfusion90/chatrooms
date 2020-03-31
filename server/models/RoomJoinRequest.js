const mongoose = require('mongoose')
const { UserSchema } = require('./User')
const { RoomSchema } = require('./Room')

const RoomJoinRequestSchema = new mongoose.Schema({
    requestedBy: {
        type: UserSchema,
        required: true
    },
    room: {
        type: RoomSchema,
        required: true
    }
})

const RoomJoinRequest = mongoose.model('RoomJoinRequest', RoomJoinRequestSchema)

module.exports = { RoomJoinRequestSchema, RoomJoinRequest }