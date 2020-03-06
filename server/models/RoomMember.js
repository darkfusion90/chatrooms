const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomMemberSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    memberType: {
        type: String,
        enum: ['participant', 'admin'],
        required: true,
    }
})

module.exports = mongoose.model('RoomMember', RoomMemberSchema)