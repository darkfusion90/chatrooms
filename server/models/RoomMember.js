const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberTypes = require('../constants/memberTypes')

const RoomMemberSchema = new Schema({
    room: {
        type: Schema.Types.String,
        ref: 'Room'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    memberType: {
        type: String,
        enum: [...Object.values(memberTypes)],
        required: true,
    }
})

RoomMemberSchema.methods.isAdmin = function () {
    return this.memberType === memberTypes.MEMBER_TYPE_ADMIN
}

RoomMemberSchema.methods.isParticipant = function () {
    return this.memberType === memberTypes.MEMBER_TYPE_PARTICIPANT
}

module.exports = mongoose.model('RoomMember', RoomMemberSchema)