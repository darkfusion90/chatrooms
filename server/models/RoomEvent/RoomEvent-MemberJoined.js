const mongoose = require('mongoose')


const RoomMemberJoinedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.String,
        ref: 'Room',
        required: true
    },
    joinedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true,
    }
})


module.exports = mongoose.model('RoomMemberJoined', RoomMemberJoinedSchema)