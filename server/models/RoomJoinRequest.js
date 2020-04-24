const mongoose = require('mongoose')


const RoomJoinRequestSchema = new mongoose.Schema({
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        immutable: true,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.String,
        immutable: true,
        required: true
    },
    status: {
        type: String,
        enum: ['initial', 'accepted', 'rejected'],
        default: 'initial'
    },
    requestedAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('RoomJoinRequest', RoomJoinRequestSchema)