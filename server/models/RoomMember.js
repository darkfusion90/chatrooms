const mongoose = require('mongoose')
const Schema = mongoose.Schema


const RoomMemberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    memberType: {
        type: String,
        enum: ['participant', 'admin'],
        required: true,
    }
})

module.exports = mongoose.model('RoomMember', RoomMemberSchema)