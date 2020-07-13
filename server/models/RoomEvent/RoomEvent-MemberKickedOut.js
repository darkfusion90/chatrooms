const mongoose = require('mongoose')


const RoomMemberKickedOutSchema = new mongoose.Schema({
    whoKicked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    victim: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.String,
        ref: 'Room',
        required: true
    },
    kickedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true,
    }
})


module.exports = mongoose.model('RoomMemberKickedOut', RoomMemberKickedOutSchema)